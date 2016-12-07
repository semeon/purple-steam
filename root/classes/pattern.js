export class Pattern {
	constructor(props) {
		this.length = props.seq.length
		this.preSequence = props.seq.slice(0, this.length-1)
		this.expectation = props.seq[this.length-1]
		this.preSequenceNorm = []
		for (let i=0; i<this.preSequence.length; i++) {
			let word = this.preSequence[i]
			let normWord = props.vocab.getItem({value: word}).normCode
			// console.log("Word: " + word + " - " + normWord)
			this.preSequenceNorm.push(normWord)
		}		
	}

}