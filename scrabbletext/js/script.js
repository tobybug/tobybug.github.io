//thanks to the Matter.js physics engine
//http://brm.io/matter-js/

function getUrlVars() { //not my code, got it from http://papermashup.com/read-url-get-variables-withjavascript/
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

var getlettertile = function(letter) {
	if(letter.length != 1){
		return;
	}
	caps = letter.toUpperCase();
	return {render:{sprite:{texture:"images/"+caps+".jpg"}}};
}

var displetterrow = function(message, y, x){
	var letters = [];
	for(var i = 0; i < message.length; i++){
		letters.push(Bodies.rectangle(i*80+x, y, 80, 80, getlettertile(message.split("")[i])));
	}
	return letters
}

var centerRow = function(length, width){
	var result = (width - 80*(length))/2 + 40;
	return result
}

// Matter.js module aliases
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
	options: {
	  showAngleIndicator: false,
	  wireframes: false
	}
  }
});

var width  = engine.render.options.width;
var height = engine.render.options.height;
// make a mouse constraint
mouseConstraint = MouseConstraint.create(engine);
// add it
World.add(engine.world, mouseConstraint);

//get letters from URL
var row1 = getUrlVars()["row1"];
console.log(row1);
var row2 = getUrlVars()["row2"];
console.log(row2);
var row3 = getUrlVars()["row3"];
console.log(row3);

if(row1 === undefined & row2 === undefined & row3 === undefined) {
	row1 = "Hello";
	row2 = "World";
}

if(row1 === undefined) {
	row1 = "";
}
if(row2 === undefined) {
	row2 = "";
}
if(row3 === undefined) {
	row3 = "";
}

// add the three letter rows to the world
World.add(engine.world, displetterrow(row1, 100, centerRow(row1.length, width)));
World.add(engine.world, displetterrow(row2, 200, centerRow(row2.length, width)));
World.add(engine.world, displetterrow(row3, 300, centerRow(row3.length, width)));

//World.add(engine.world, Bodies.rectangle(width/2, height/2, 100, 100, { isStatic: true }));

//add gravity
engine.world.gravity.y = 1;

// create four walls
var walls = [];
walls.push(Bodies.rectangle(400, 610, 810,  60, { isStatic: true }));
walls.push(Bodies.rectangle(810, 300,  60, 610, { isStatic: true }));
walls.push(Bodies.rectangle(-10, 300,  60, 610, { isStatic: true }));
walls.push(Bodies.rectangle(400, -10, 810,  60, { isStatic: true }));

// add all the walls to the world
World.add(engine.world, walls);

// run the engine
Engine.run(engine);