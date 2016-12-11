// http://cs.stanford.edu/people/karpathy/convnetjs/docs.html
const convnetjs = require("convnetjs")
const sortObj = require('sort-object');

const jsonfile = require('jsonfile')
jsonfile.spaces = 2

const networkJsonFileName = 'root/data/network/nn.json' 

export class Network {
	constructor(props) {
		this.vocab = props.vocab
		this.patternVol = props.patternVol
		this.net
		this.trainer
		this.trainingIterations = 1000
	}

	init(props) {
		let layer_defs = []
		layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:this.patternVol.getLength()-1})
		layer_defs.push({type:'fc', num_neurons:200, activation:'relu'})
		layer_defs.push({type:'fc', num_neurons:200, activation:'relu'})
		layer_defs.push({type:'fc', num_neurons:200, activation:'relu'})
		layer_defs.push({type:'softmax', num_classes:this.vocab.getSize()})
		
		this.net = new convnetjs.Net()
		this.net.makeLayers(layer_defs)
		this.trainer = new convnetjs.Trainer(this.net, 
			{method: 'adadelta', l2_decay: 0.001, batch_size: 100})
	}
	
	train(props) {
		console.log("")
		console.log("====== Start Training ===================")


		let patterns = this.patternVol.getPatterns()

		let trainingData = []
		for (let i=0; i<patterns.length; i++) {
			let td = {}
			td.dataPoint = new convnetjs.Vol(patterns[i].preSequenceNorm)
			td.class = patterns[i].expectationClass
			trainingData.push(td)
		}

		// training iterations
		for (let i=0; i<this.trainingIterations; i++) {
			for (let j=0; j<trainingData.length; j++) {
				let stats = this.trainer.train(trainingData[j].dataPoint, trainingData[j].class)
				// if (i%100 == 0) {
				// 	console.log(" training iteration:", i, ", data point:", j, ", stats:")
				// 	console.dir(stats)
				// }
			}
			if (i%100 == 0) {
				console.log(" training iteration:", i)
			}

		}

		console.log("Training completed.")
		this.saveNetwork()
	}
	
	saveNetwork() {
		console.log("")
		console.log("====== Save Trained Network ===================")			
		let nnJson = this.net.toJSON()
		jsonfile.writeFileSync(networkJsonFileName, nnJson)		
	}

	loadNetwork() {
		let nnJson = jsonfile.readFileSync(networkJsonFileName)		
		this.net.fromJSON(nnJson)
	}

	
	run(props) {
		let vol = new convnetjs.Vol(props.normSeq)
		let prediction = this.net.forward(vol).w
		let bestOption = {}
		bestOption.prob = 0
		bestOption.class = ""

		for (let i=0; i<prediction.length; i++) {
			let prob = prediction[i]
			if (bestOption.prob < prob) {
				bestOption.prob = prob
				bestOption.class = i
			}
		}
		
		let result = this.vocab.getItem({class: bestOption.class}).value

		return result
	}
}