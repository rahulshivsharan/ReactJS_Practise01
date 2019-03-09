var http = require("http");
var browserify = require("browserify");
var literalify = require("literalify");
var React = require("react");
var ReactDOMServer = require("react-dom/server");

import App from "./app";

http.createServer(function(req,res){
	if(req.url === "/"){
		res.setHeader("Content-Type","text/html");

		var propertyObject = {
			items : ["Item 0", "Item 1"]
		};

		var html = ReactDOMServer.renderToStaticMarkup(
			<body>
				<div 	id="content" 
						dangerouslySetInnerHTML = {{
							__html : ReactDOMServer.renderToString(<App items={propertyObject["items"]} />)	
				}}/>

				<script dangerouslySetInnerHTML = {{
					__html : "var APP_PROPS = " + JSON.stringify(propertyObject) + ";"
				}} />		

				<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
				<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        		<script src="/bundle.js"/>
			</body>
		);
		res.end(html);
	}else if(req.url === "/bundle.js"){
		res.setHeader('Content-Type', 'text/javascript');
		browserify()
		.add("./browser.js")
		.transform(literalify.configure({
			"react" : "window.React",
			"react-dom" : "window.ReactDOM"
		})).bundle().pipe(res);
	}else{
		res.statusCode = 404;
		res.end();
	}
}).listen(3000,function(err){
	if(err) throw err;
	console.log("listening to 3000.....");
});