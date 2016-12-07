import {Pattern} from '/root/classes/pattern.js'
const split = require('split-string-words')

const jsonfile = require('jsonfile')
jsonfile.spaces = 2

// import * from 'read-file'


export class PatternVolume {
	constructor(props) {
		this.vocab = props.vocab
		this.name = props.name
		this.length = props.length
		this.volume = {}
		this.volume.patterns = []
		
		this.volumeFileName = 'root/data/input/patterns/vol-' + this.name + '.json'
	}

	init(props) {
		console.log("Init Pattern Volume. Pattern length: " + this.length)
		
		for (let i=0; i<props.lines.length; i++) {
			this.parseText({line:props.lines[i]})
		}
		jsonfile.writeFileSync(this.volumeFileName, this.volume)
	}
	
	parseText(props) {
		let words = split(props.line)

		// console.log(">>>> ")
		// console.log(">>>> props.line: " + props.line)
		// console.log(">>>> words: " + words)

		for (let i=0; i<words.length; i++) {
			if ( i + this.length - 1 < words.length) {

				
				// var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
				// var citrus = fruits.slice(1, 3);
				// citrus: ["Orange", "Lemon"]
				let sequence = words.slice(i, i+this.length)
				
				// console.log(">>>> sequence: " + sequence)			
				
				this.addPattern({seq: sequence})
			}
		}
	}

	// addSequence(props) {
	// 	this.volume.sequences.push(props.seq)
	// }

	addPattern(props) {
		let pattern = new Pattern({seq:props.seq, vocab: this.vocab})
		this.volume.patterns.push(pattern)
	}

	getPatterns() {
		return this.volume.patterns
	}
}