//Body element 
const body = d3.select('body')

//Set styles t body
body.style({
	'height': '100%',
	'position':'absolute',
	'width': '100%',
	'overflow':'hidden',
	'background': '#DCDCDC'
})

//Append div with h1 tag and text
body
.append('div')
.append('h1')
.text('Click somewhere')
.style({
	'position': 'absolute',
	'z-index': '-5'
})

//Set svg into body element
const svg = d3.select('body').append('svg');

//Set styles to svg
svg
.attr('height', '100%')
.attr('width', '100%')

//Init array to write click coordinates
let events = [];

//Onclick function
svg.on('click', function () {
    events.push(d3.event);
    //Clear array if there are to many circles into the svg
    if (events.length > 15) events.shift();

    //Set another circles style
    let circles = svg.selectAll('circle')
        .data(events, function (e) { return e.timeStamp })
        .attr('fill', 'gray');

    //Add new circle into svg
    circles
        .enter()
        .append('circle')
        .attr('cx', function (d) { return d.x || d.pageX })
        .attr('cy', function (d) { return d.y || d.pageY })
        .attr('fill', 'red')
        .attr('r', 10);
    circles
        .exit()
        .remove();
});