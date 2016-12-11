const jsonfile = require('jsonfile')
jsonfile.spaces = 2

const outputMsgFileName = 'root/data/output/output.json' 

export class Output {
	constructor(props) {
		this.vocab = props.vocab
		this.messages = []
	}

	addMessage(props) {
		this.messages.push(props.message)
	}

	save() {
		jsonfile.writeFileSync(outputMsgFileName, this.messages)
	}

}