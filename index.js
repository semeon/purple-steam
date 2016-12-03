// read
// http://caza.la/synaptic/#/
// http://cs.stanford.edu/people/karpathy/recurrentjs/
// http://machinelearningmastery.com/text-generation-lstm-recurrent-neural-networks-python-keras/

var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
		
		console.log("STARTED");
		
var hopfield = new Architect.Hopfield(10) // create a network for 10-bit patterns

// teach the network two different patterns
hopfield.learn([
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
])

// feed new patterns to the network and it will return the most similar to the ones it was trained to remember
var a = hopfield.feed([0,1,0,1,0,1,0,1,1,1]) // [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
var b = hopfield.feed([1,1,1,1,1,0,0,1,0,0]) // [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]

console.log("a", a);
console.log("b", b);

