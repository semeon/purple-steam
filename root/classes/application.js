import {Source} from '/root/classes/source.js'
import {Vocab} from '/root/classes/vocab.js'
import {PatternVolume} from '/root/classes/patternVolume.js'


export class Application {
	constructor(props) {
		this.source = new Source()
		this.vocab = new Vocab()
		this.patterns3 = new PatternVolume({name:"3-words", length:3})
		this.patterns4 = new PatternVolume({name:"4-words", length:4})
		this.patterns5 = new PatternVolume({name:"5-words", length:5})
	}

	init() {
		console.log("Init App")
		this.source.init()
		this.vocab.init({words:this.source.getWords()})
		this.patterns3.init({lines:this.source.getLines()})
		this.patterns4.init({lines:this.source.getLines()})
		this.patterns5.init({lines:this.source.getLines()})
	}

	test() {
		let search = this.vocab.getItem({value:"America"})
		console.log("Searching for America:")
		console.log(search)
	}


}
