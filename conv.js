// https://github.com/karpathy/convnetjs
// http://cs.stanford.edu/people/karpathy/convnetjs/started.html

var convnetjs = require("convnetjs");

var layer_defs = [];
layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
layer_defs.push({type:'fc', num_neurons:5, activation:'sigmoid'});
layer_defs.push({type:'regression', num_neurons:1});
var net = new convnetjs.Net();
net.makeLayers(layer_defs);
 
var a = new convnetjs.Vol([0.5, -1.3]);
// var b = new convnetjs.Vol([0.2, -1.3]);
// var c = new convnetjs.Vol([0.3, -1.3]);
// var d = new convnetjs.Vol([0.4, -1.3]);
// var e = new convnetjs.Vol([0.5, -1.3]);
// var f = new convnetjs.Vol([0.6, -1.3]);
 
// train on this datapoint, saying [0.5, -1.3] should map to value 0.7:
// note that in this case we are passing it a list, because in general
// we may want to  regress multiple outputs and in this special case we 
// used num_neurons:1 for the regression to only regress one.
var trainer = new convnetjs.SGDTrainer(net, 
              {learning_rate:0.01, momentum:0.0, batch_size:1, l2_decay:0.001});


// example that uses adadelta. Reasonable for beginners.
//var trainer = new convnetjs.Trainer(net, {method: 'adadelta', l2_decay: 0.001, batch_size: 1});


var data = [
						[0.1, 0.2, 0.3, 0.4],
						[0.2, 0.3, 0.4, 0.5],
						[0.3, 0.4, 0.5, 0.6],
						[0.4, 0.5, 0.6, 0.7]
 					];

var labels = [ 0.5, 0.6, 0.7, 0.8];


for(var i=0;i<data.length;i++) {
	
	
  var x = new convnetjs.Vol(1,1,4,0.0); // a 1x1x4 volume initialized to 0's.
  x.w[0] = data[i][0]; // Vol.w is just a list, it holds your data
  x.w[1] = data[i][1];
  x.w[2] = data[i][2];
  x.w[3] = data[i][3];
	
//	console.dir(x.w);
// 	console.dir(labels);
  trainer.train(x, labels[i]);
}

var s = new convnetjs.Vol([0.4, 0.5, 0.6, 0.7])
 
// evaluate on a datapoint. We will get a 1x1x1 Vol back, so we get the
// actual output by looking into its 'w' field:
var predicted_values;
predicted_values = net.forward(x);
console.log('seed:', s.w);	
console.log('predicted value:', predicted_values.w);	
