// 檔 不能 沒有註解
var root = null;
var items = [];

$.getJSON("data.json", function(data) {
	root = data;
	// create view
	createView(transformData(root));
	yeee();
});

function analyzeReceivedNode(node) {
	var level = 1;
	var node_tmp = node;
	items.length = 0;
	while (!node_tmp.hasOwnProperty("正在接受職業訓練")) {
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
	chart2_scope();
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
	for (var i = 0; i < 39; ++i) {
		var j = i + 39;
		while (j < items.length) {
			items[i].bar += items[j].bar;
			j += 39;
		}
	}
	chart2_scope();
}

var dimension = {
	size: 600,
	diameter: 500
};

dimension.spacing = (dimension.size - dimension.diameter) / 2;

var chart1 = d3.select('#chart1');
var pie = chart1
	.attr('width', dimension.size)
	.attr('height', dimension.size)
	.attr('x', dimension.spacing)
	.attr('y', dimension.spacing)
	.append('g')
		.attr('id', 'pie')
		.attr('transform', 'translate(' + (dimension.size / 2) + ', ' + (dimension.size / 2) + ')');

var partition = d3.layout.partition()
	.size([2 * Math.PI, dimension.diameter * dimension.diameter / 4])
	.value(function(d) { return d.size; });

var arc = d3.svg.arc()
	.startAngle(function(d) { return d.x; })
	.endAngle(function(d) { return d.x + d.dx; })
	.innerRadius(function(d) { return Math.sqrt(d.y); })
	.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

function transformData(json) {
	return {name: 'root', children: makeTreeRecursively(json)};
}

function makeTreeRecursively(arr) {
	var list = [];
	for(var k in arr) {
		// if v is an Array
		if (typeof arr[k] === 'object') {
			list.push({name: k, children: makeTreeRecursively(arr[k]), original: arr[k]});
		} else {
			list.push({name: k, size: arr[k]});
		}
	}
	return list;
}

function pieClearSelection() {
	d3.selectAll('#pie').classed('focused', false);
	d3.select('#yeeee1').text('');
	d3.select('#yeeee2').text('');
	d3.select('#yeeee3').text('');
	d3.select('#yeeeey').text('');
}

function createView(viewObj) {
	//yeeinit function about color
	var color = d3.scale.category10();

	pie.append('circle')
		.attr('r', dimension.diameter / 2)
		.style('opacity', 0)
		.on('mouseleave', function() {
			// if not locked clear the selection
			pieClearSelection();
		});

	var nodes = partition.nodes(viewObj).filter(function(d) {
		return d.depth <= 3 && d.dx > 0.002;
	});
	var path = pie.data([viewObj])
		.selectAll('path')
		.data(nodes)
		.enter()
			.append('path')
			.attr('d', arc)
			.attr('fill-rule', 'evenodd')
			.style('fill', function(d, i) {
				if (d.depth === 0)
					return 'transparent';
				return color(i % 10);
			})
			.on('mouseover', function(evt) {
				// if it was locked
				// or whatever
				pieClearSelection();
				// show text in the middle of the graph
				d3.select('#yeeee1').text('[ 總計 ]');
				// show all number
				d3.select('#yeeeey').text(evt.value)
				if (evt.depth === 0) {
					d3.selectAll('#pie').classed('focused', false);
					return;
				}
				d3.selectAll('#pie').classed('focused', true);

				var yyee = evt;
				switch (evt.depth) {
					case 3: d3.select('#yeeee3').text(yyee.name); yyee = yyee.parent;
					case 2: d3.select('#yeeee2').text(yyee.name); yyee = yyee.parent;
					case 1: d3.select('#yeeee1').text(yyee.name);
				}
				// d3.select("#explanation")
				// 	.style("visibility", "");
				analyzeReceivedNode(evt.original);
			})
			.on('click', function() {
				// toggle lock
			});
}

/* below is chart */

var chart2_scope = function(){
	var colorize = [];
	var color = d3.scale.category10();
	for(var i=0 ; i<10 ; ++i) colorize.push( color(i) );
	color = d3.scale.category20();
	for(i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	color = d3.scale.category20b();
	for(i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	color = d3.scale.category20c();
	for(i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	var renderBlock = document.querySelector('#studentsBlock');
	var randPos = function(){
		var maxWidth = renderBlock.offsetWidth * 0.9;
		var maxHeight = renderBlock.offsetHeight * 0.9;
		var diffWidth = renderBlock.offsetWidth * 0.05;
		var diffHeight = renderBlock.offsetHeight * 0.05;
		return function(){
			var nowX = Math.random() * maxWidth + diffWidth;
			var nowY = Math.random() * maxHeight + diffHeight;
			return 'translate('+nowX.toFixed(0)+' '+nowY.toFixed(0)+')';
		};
	}();

	var categorySetIcon;
	var categorySetText;
	var studentsSet;

	return function(){
		if( items.length <= 0 )
			return false;

		d3.select("#iconExplain").selectAll('path').remove();
		d3.select("#iconExplain").selectAll('text').remove();
		d3.select("#chart2").selectAll('path').remove();

		var category = [];
		for(i=0 ; i<39 && items.length ; ++i)
			category.push({
				work: items[i].foo,
				num: items[i].bar,
				colorCode: colorize[i]
			});

		var dataBind = d3.select("#iconExplain").selectAll('path').data(category);
		categorySetIcon = dataBind.enter().append('path');
		categorySetIcon.attr({
			'stroke': function(it){ return it.colorCode; },
			'stroke-width': '2px',
			'transform': function(it,id){
				if( id<12 )
					return 'translate(28 '+(id*20)+') scale(0.5 0.5)';
				else if( id<24 )
					return 'translate(178 '+((id-12)*20)+') scale(0.5 0.5)';
				else
					return 'translate(328 '+((id-24)*20)+') scale(0.5 0.5)';
			},
			'fill': 'none',
			'd': 'M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z'
		});
		dataBind = d3.select("#iconExplain").selectAll('text').data(category);
		categorySetText = dataBind.enter().append('text');
		categorySetText.attr({
				'x': function(it,id){
					if( id<12 )
						return '48';
					else if( id<24 )
						return '198';
					else
						return '348';
				},
				'y': function(it,id){
					if( id<12 )
						return id*20 + 13;
					else if( id<24 )
						return (id-12)*20 + 13;
					else
						return (id-24)*20 + 13;
				},
				'fill': function(it){ return it.colorCode; }
			}).text(function(it,id){ return it.work });


		var studentWork = [];
		for(i=0 ; i<category.length ; ++i){
			var to = category[i].num / 20;
			for(var j=0 ; j<=to ; ++j)
				studentWork.push({
					colorCode: colorize[i],
					pos: randPos()
				});
		}

		dataBind = d3.select("#chart2").selectAll('path').data(studentWork);
		studentsSet = dataBind.enter().append('path');
		studentsSet.attr({
			'stroke': function(it){ return it.colorCode; },
			'stroke-width': '2px',
			'transform': function(it){ return it.pos + ' scale(0 0)'; },
			'fill': 'none',
			'd': 'M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z'
		});

		studentsSet.transition()
			.duration(800)
			.delay(function(){ return (Math.random()*800).toFixed(0); })
			.attr('transform' , function(it){ return it.pos + ' scale(0.5 0.5)'; });

		return true;
	}
}();
chart2_scope();