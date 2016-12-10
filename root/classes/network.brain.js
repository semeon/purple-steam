// https://github.com/harthur/brain
const brain = require("brain");
const sortObj = require('sort-object');

const jsonfile = require('jsonfile')
jsonfile.spaces = 2

const networkJsonFileName = 'root/data/network/nn.json' 

export class Network {
	constructor(props) {
		// this.net = new brain.NeuralNetwork({hiddenLayers: [3]})
		this.net = new brain.NeuralNetwork()
		// this.net = new brain.NeuralNetwork()
	}

	init(props) {
	}
	
	train(props) {
		console.log("")
		console.log("====== Start Training ===================")

		let trainingData = []
		for (let i=0; i<props.patterns.length; i++) {
			let pattern = props.patterns[i]
			let trainingCase = {}

			trainingCase.input = pattern.preSequenceNorm
			trainingCase.output = {}
			trainingCase.output[pattern.expectation] = 1

			trainingData.push(trainingCase)
		}
		
		// console.log("Training Data: ")
		// console.dir(trainingData)
		let trainResult = this.net.train(trainingData,{errorThresh: 0.001, log: true, logPeriod: 100, learningRate: 0.5})
		console.log("Training completed. Result:")
		console.dir(trainResult)
		
		this.saveNetwork()
	}
	
	saveNetwork() {
		console.log("")
		console.log("====== Save Trained Network ===================")			
		let nnJson = this.net.toJSON()
		jsonfile.writeFileSync(networkJsonFileName, nnJson)		
	}

	loadNetwork() {
		console.log("")
		console.log("====== Load Trained Network ===================")		
		let nnJson = jsonfile.readFileSync(networkJsonFileName)		
		this.net.fromJSON(nnJson)
	}
	
	run(props) {
		let normSeq = props.normSeq
		let prediction = this.net.run(normSeq)

		let bestOption = {}
		bestOption.rank = 0
		bestOption.value = ""

		for (var option in prediction) {
			let rank = prediction[option]
			if (bestOption.rank < rank) {
				bestOption.rank = rank
				bestOption.value = option
			}
		}
		
		// console.log(">>>>>> Run: " + seed.preSequence)
		// console.dir(bestOption)

		return bestOption.value
		
	}
}