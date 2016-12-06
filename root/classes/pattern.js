export class Pattern {
	constructor(props) {
		this.length = props.seq.length
		this.preSequence = props.seq.slice(0, this.length-1)
		this.expectation = props.seq[this.length-1]
	}
}