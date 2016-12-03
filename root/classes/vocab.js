const jsonfile = require('jsonfile')
jsonfile.spaces = 2

const vocabFileName = 'root/data/vocab.json'

export class Vocab {
	constructor(props) {
		this.vocab = {}
		this.vocab.stats = {}
		this.vocab.array = []
	}

	getItem(props) {
		let result
		for (let i=0; i<this.vocab.array.length; i++) {
			let item = this.vocab.array[i]
			if (props.code == item.code || props.value == item.value) {
				result = item
			}
		}
		return result
	}


	init(props) {
		console.log("Init Vocabulary")
		this.vocab.array = []
		this.generate(props)
	}

	generate(props) {
		let words = props.words

		for (let i=0; i<words.length; i++) {
			let item = {}
			item.code = i
			item.value = words[i]
			this.vocab.array.push(item)
		}
		this.vocab.stats.totalItems = this.vocab.array.length
		jsonfile.writeFileSync(vocabFileName, this.vocab)		
	}


	
}