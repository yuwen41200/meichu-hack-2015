var root = null;
var items = [];

$.getJSON("data.json", function(data) {
	root = data;
});

function analyzeReceivedNode(node) {
	var level = 1;
	var node_tmp = node;
	while (!node_tmp.hasOwnProperty("畢業生總計")) {
		node_tmp = node_tmp[Object.keys(node_tmp)[0]];
		++level;
	}
	switch (level) {
		case 1: y(node); break;
		case 2: ye(node); break;
		case 3: yee(node); break;
		case 4: yeee(node); break;
		default: console.log("Invalid level value!"); break;
	}
}

function y(node) {
	$.each(node, function(keyyyy, vallll) {
		items.push({foo: keyyyy, bar: vallll});
	});
}

function ye(node) {
	$.each(node, function(keyyy, valll) {
		$.each(valll, function(keyyyy, vallll) {
			items.push({foo: keyyyy, bar: vallll});
		});
	});
	parseItemArray(items);
}

function yee(node) {
	$.each(node, function(keyy, vall) {
		$.each(vall, function(keyyy, valll) {
			$.each(valll, function(keyyyy, vallll) {
				items.push({foo: keyyyy, bar: vallll});
			});
		});
	});
	parseItemArray(items);
}

function yeee(node) {
	$.each(node, function(key, val) {
		$.each(val, function(keyy, vall) {
			$.each(vall, function(keyyy, valll) {
				$.each(valll, function(keyyyy, vallll) {
					items.push({foo: keyyyy, bar: vallll});
				});
			});
		});
	});
	parseItemArray(items);
}

function parseItemArray(items) {
	for (var i = 0; i < 43; ++i) {
		var j = i + 43;
		while (j < items.length) {
			items[i].bar += items[j].bar;
			j += 43;
		}
	}
}

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
