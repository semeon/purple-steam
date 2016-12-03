import {Source} from '/root/classes/source.js'
import {Vocab} from '/root/classes/vocab.js'

export class Application {
	constructor(props) {
		this.source = new Source()
		this.vocab = new Vocab()
	}

	init() {
		console.log("Init App")
		this.source.init()
		this.vocab.init({words:this.source.getWords()})
		
		let search = this.vocab.getItem({value:"America"})
		console.log("Searching for America:")
		console.log(search)
	}

}
