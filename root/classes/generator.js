import {Pattern} from '/root/classes/pattern.js'

// Load and instantiate Chance
const chance = require('chance').Chance();

export class Generator {
	constructor(props) {
		this.vocab = props.vocab
		this.net = props.net
		this.patterns = props.patterns
	}

	run() {
		
		// random seed 
		let random = chance.integer({min: 0, max: this.patterns.length-1})
		let seed = this.patterns[random]
		let newLine = seed.preSequence[seed.preSequence.length-1]
		let sequence = seed.preSequence

		// console.log("SEED: " + newLine)


		for (let i=0; i<15; i++) {
			// console.log("")
			// console.log("------ Step: " + i + " --------------")
			// console.log("sequence: " + sequence)
			// console.dir(sequence)
	
			
			// norm sequence

			let normSeq = []
			for (let i=0; i<sequence.length; i++) {
				let word = sequence[i]
				let normWord = this.vocab.getItem({value: word}).normCode
				// console.log("Word: " + word + " - " + normWord)
				normSeq.push(normWord)
			}	
			// console.log("normSeq: ")
			// console.dir(normSeq)

			
			// generate new word
			let newWord = this.net.run({normSeq: normSeq})
			// console.log("new word: " + newWord)

			// add the word to the output line
			newLine = newLine + " " + newWord
			// console.log("newLine: " + newLine)

			// update sequence - slide and add new word
			sequence = sequence.slice(1, sequence.length) // drop first item
			sequence.push(newWord)
			// console.log("new sequence: ")
			// console.dir(sequence)
		}
		console.log("NEW LINE: " + newLine)		
		return newLine
	}
}