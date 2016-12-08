import {Source} from '/root/classes/source.js'
import {Vocab} from '/root/classes/vocab.js'
import {PatternVolume} from '/root/classes/patternVolume.js'
import {Network} from '/root/classes/network.js'
import {Output} from '/root/classes/Output.js'
import {Generator} from '/root/classes/generator.js'


export class Application {
	constructor(props) {
		this.source = new Source()
		this.vocab = new Vocab()
		// this.patterns3 = new PatternVolume({name:"3-words", length:3, vocab: this.vocab})
		// this.patterns4 = new PatternVolume({name:"4-words", length:4, vocab: this.vocab})
		// this.patterns5 = new PatternVolume({name:"5-words", length:5, vocab: this.vocab})
		
		this.patternVol =  new PatternVolume({name:"5-words", length:5, vocab: this.vocab})
		this.output = new Output({vocab: this.vocab})
		this.nn = new Network()
		
		this.generator = new Generator({
			patterns: this.patternVol.getPatterns(), 
			net: this.nn, 
			vocab: this.vocab})
	}

	init() {
		console.log("")
		console.log("====== Prepare Network ===================")		
		this.source.init()
		this.vocab.init({words:this.source.getWords()})
		this.patternVol.init({lines:this.source.getLines()})

		this.nn.init()
	}
	
	generateOutput() {
		console.log("")
		console.log("====== Start Generation ===================")		
		this.nn.loadNetwork()
		for (let i=0; i<100; i++) {
			let line = this.generator.run()
			this.output.addMessage({message: line})
		}
		this.output.save()
	}

	generateLine() {
		this.generator.run()
	}

	trainNetwork() {
		this.nn.train({patterns: this.patternVol.getPatterns()})
	}




	test() {
		// let search = this.vocab.getItem({value:"America"})
		// console.log("Searching for America:")
		// console.log(search)
	}


}
