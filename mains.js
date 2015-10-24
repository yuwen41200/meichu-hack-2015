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

var chart1 = d3.select('#chart1');
chart1
	.attr('width', 100)
	.attr('height', 100);
chart1.append('rect')
	.attr('x', 20)
	.attr('y', 20)
	.attr('width', 60)
	.attr('height', 60)
	.attr('fill', '#232323');

var chart2 = d3.select('#chart2');
chart2
	.attr('width', 100)
	.attr('height', 100);
chart2.append('rect')
	.attr('x', 20)
	.attr('y', 20)
	.attr('width', 60)
	.attr('height', 60)
	.attr('stroke', '#ff6600')
	.attr('stroke-width', 5.5)
	.attr('fill-opacity', 0.1);
