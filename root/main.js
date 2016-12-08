import {Application} from '/root/classes/application.js'

let param = process.argv[2]

let app = new Application()
app.init()

if (param == "train") {
	app.trainNetwork()

} else if(param == "generate") {
	app.generateOutput()

} else {
	app.trainNetwork()
	app.generateOutput()
}
