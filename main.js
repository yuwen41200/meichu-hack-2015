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

var pieChart = d3.select('#piechart');

pieChart
	.attr('width', 100)
	.attr('height', 100);

pieChart.append('rect')
	.attr('x', 20)
	.attr('y', 20)
	.attr('width', 60)
	.attr('height', 60)
	.attr('fill', '#232323');
