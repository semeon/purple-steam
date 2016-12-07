// https://github.com/harthur/brain

const brain = require("brain");

export class Network {
	constructor(props) {
		this.net = new brain.NeuralNetwork()
		this.vocab
		this.patterns
	}

	init(props) {
		this.vocab = props.vocab
		this.patterns = props.patterns
	}
	
	train(props) {
		console.log("Training started..")

		let trainingData = []

	  // trainingData = [
	  // 	 	 {input: [0, 0, 0], output: {start:1} },
	  // 	 	 {input: [0.666, 0.333, 0], output: {for:1} },
	  // 	 	 {input: [0.333, 0, 0.666], output: {'will':1} },
	  // 	 	 {input: [0, 0.333, 0.666], output: {'America':1} },
	  // ]
		
		for (let i=0; i<this.patterns.length; i++) {
			let pattern = this.patterns[i]
			let trainingCase = {}

			trainingCase.input = pattern.preSequenceNorm
			trainingCase.output = {}
			trainingCase.output[pattern.expectation] = 1

			trainingData.push(trainingCase)
		}
		
		console.log("Training Data: ")
		console.dir(trainingData)
		
		let trainResult = this.net.train(trainingData)
		
		console.log("Training completed. Result:")
		console.dir(trainResult)
	}
}