$.getJSON( "data.json", function(data) {
	'use strict';
	var items = [];
	$.each(data, function(key, val) {
		$.each(val, function(keyy, vall) {
			$.each(vall, function(keyyy, valll) {
				$.each(valll, function(keyyyy, vallll) {
					items.push({foo: keyyyy, bar: vallll});
				});
			});
		});
	});
	console.log(items);
});

var dimension = {
	size: 400,
	diameter: 300
}

dimension.spacing = (dimension.size - dimension.diameter) / 2;

var chart1 = d3.select('#chart1');
chart1
	.attr('width', dimension.size)
	.attr('height', dimension.size);

var pie = chart1.append('rect')
	.attr('x', dimension.spacing)
	.attr('y', dimension.spacing)
	.attr('width', dimension.diameter)
	.attr('height', dimension.diameter)
	.attr('fill', '#232323')
	.append('g')
		.attr('id', 'pie')
		.attr('transform', 'translate(' + (dimension.size / 2) + ', ' + (dimension.size / 2) + ')');

var chart2 = d3.select('#chart2');
chart2
	.attr('width', dimension.size)
	.attr('height', dimension.size);
chart2.append('rect')
	.attr('x', dimension.spacing)
	.attr('y', dimension.spacing)
	.attr('width', dimension.diameter)
	.attr('height', dimension.diameter)
	.attr('stroke', '#ff6600')
	.attr('stroke-width', 5.5)
	.attr('fill-opacity', 0.1);

var partition = d3.layout.partition()
    .size([2 * Math.PI, dimension.radius * dimension.radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
	.startAngle(function(d) { return d.x; })
	.endAngle(function(d) { return d.x + d.dx; })
	.innerRadius(function(d) { return Math.sqrt(d.y); })
	.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

d3.json('data.json', function(json) {
	createView(transformData(json));
});

function transformData(json) {
	var root = {name: 'root', children: mktree(json)};
	console.log(root, json);
	return root;
}

function mktree(arr) {
	var list = [];
	for(var k in arr) {
		// if v is an Array
		if (typeof arr[k] === 'object') {
			list.push({name: k, children: mktree(arr[k]), original: arr[k]});
		} else {
			list.push({name: k, size: arr[k]});
		}
	};
	return list;
}

function createView(viewObj) {
	pie.append('circle')
		.attr('r', dimension.diameter)
		.attr('fill', '#f44336');

	var nodes = partition.nodes(viewObj);
	var path = pie.data([viewObj])
		.selectAll('path')
		.data(nodes)
		.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill-rule', 'evenodd');
			// .style('')
}
