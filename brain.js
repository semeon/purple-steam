// https://github.com/harthur/brain


var brain = require("brain");

var net = new brain.NeuralNetwork();

var x1 = [0, 0, 0];
var x2 = [0.333, 0.333, 0.333];
var x3 = [1, 1, 1];
var x4 = [0.666, 0.666, 0.666];

var trainResult = net.train(
 [ 
	 {input: x1, output: {c:1} },
	 {input: x2, output: {a:1} },
	 {input: x3, output: {b:1} },
	 {input: x4, output: {d:1} },
 ]);

var input = x4;

var output = net.run(input);

// var trainResult = net.train([
// 						{input: {a:1, b:0, c:0}, 	output: {a:1}},
// 						{input: {a:0, b:1, c:0}, 	output: {b:1}},
// 						{input: {a:0, b:0, c:1}, 	output: {c:1}},
// 				 ],
// 				 {
// 				   learningRate: 0.1
// 				 }
//
// 			 );
// var output = net.run({a:1, b:0, c:0});

console.log("input:", input)
console.log("output:", output)
