import {Source} from '/root/classes/source.js'
import {Vocab} from '/root/classes/vocab.js'
import {PatternVolume} from '/root/classes/patternVolume.js'

import {Network} from '/root/classes/network.js'


export class Application {
	constructor(props) {
		this.source = new Source()
		this.vocab = new Vocab()
		this.patterns3 = new PatternVolume({name:"3-words", length:3, vocab: this.vocab})
		this.patterns4 = new PatternVolume({name:"4-words", length:4, vocab: this.vocab})
		this.patterns5 = new PatternVolume({name:"5-words", length:5, vocab: this.vocab})
		
		this.nn = new Network()
	}

	init() {
		console.log("Init App")
		this.source.init()
		this.vocab.init({words:this.source.getWords()})
		// this.patterns3.init({lines:this.source.getLines()})
		this.patterns4.init({lines:this.source.getLines()})
		// this.patterns5.init({lines:this.source.getLines()})

		this.nn.init({patterns: this.patterns4.getPatterns(), vocab: this.vocab})
		
		this.nn.train()

	}

	test() {
		// let search = this.vocab.getItem({value:"America"})
		// console.log("Searching for America:")
		// console.log(search)
	}


}
