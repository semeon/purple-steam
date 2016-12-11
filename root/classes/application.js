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

		// this.patternVol = new PatternVolume({name:"2-words", length:2, vocab: this.vocab})
		// this.patternVol = new PatternVolume({name:"3-words", length:3, vocab: this.vocab})
		this.patternVol = new PatternVolume({name:"4-words", length:4, vocab: this.vocab})
		// this.patternVol =  new PatternVolume({name:"5-words", length:5, vocab: this.vocab})
		// this.patternVol =  new PatternVolume({name:"6-words", length:6, vocab: this.vocab})

		this.output = new Output({vocab: this.vocab})

		this.nn = new Network({
			patternVol: this.patternVol,
			vocab: this.vocab})
		
		this.generator = new Generator({
			net: this.nn, 
			patterns: this.patternVol.getPatterns(), 
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
		console.log("====== Load Trained Network ===================")		
		this.nn.loadNetwork()
		console.log("Loaded successfully.")		
		console.log("")
		console.log("====== Start Generation ===================")		
		for (let i=0; i<100; i++) {
			let line = this.generator.run()
			this.output.addMessage({message: line})
		}
		this.output.save()
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
