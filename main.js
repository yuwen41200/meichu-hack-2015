// 檔 不能 沒有註解
var root = null;
var items = [];
var pieSelectedPath = null;

$.getJSON("data.json", function(data) {
	root = data;
	// create view
	createView(transformData(root));
	yeee(root);
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
	size: 840,
	diameter: 760
};

dimension.radius = dimension.size / 2;
dimension.spacing = (dimension.size - dimension.diameter) / 2;

var chart1 = d3.select('#chart1');
var pie = chart1
	.attr('width', dimension.size)
	.attr('height', dimension.size)
	.attr('x', dimension.spacing)
	.attr('y', dimension.spacing)
	.append('g')
		.attr('id', 'pie')
		.attr('transform', 'translate(' + dimension.radius + ', ' + dimension.radius + ')');

d3.select('#yeeee-text')
	.attr('transform', 'translate(' + dimension.radius + ', ' + dimension.radius + ')');

var partition = d3.layout.partition()
	.size([2 * Math.PI, dimension.diameter * dimension.diameter / 4])
	.value(function(d) { return d.size; });

var arc = d3.svg.arc()
	.startAngle(function(d) { return d.x; })
	.endAngle(function(d) { return d.x + d.dx; })
	.innerRadius(function(d) { return Math.sqrt(d.y); })
	.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

function transformData(json) {
	return {name: 'root', children: makeTreeRecursively(json), original: json};
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

function pieSetSelection(obj) {
	pieClearSelection();
	// show text in the middle of the graph
	d3.select('#yeeee1')
		.text('[ 總計 ]')
		.style('fill', null);
	// show all number
	d3.select('#yeeeey').text(obj.value);
	if (obj.depth === 0) {
		d3.selectAll('#pie').classed('focused', false);
		return;
	}
	d3.selectAll('#pie').classed('focused', true);

	var yyee = obj;
	switch (obj.depth) {
		case 3: d3.select('#yeeee3').text(yyee.name).style('fill', yyee.__color); yyee = yyee.parent;
		/* falls through */
		case 2: d3.select('#yeeee2').text(yyee.name).style('fill', yyee.__color); yyee = yyee.parent;
		/* falls through */
		case 1: d3.select('#yeeee1').text(yyee.name).style('fill', yyee.__color);
	}
	return obj;
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
			if (!pieSelectedPath)
				pieClearSelection();
		});

	var nodes = partition.nodes(viewObj).filter(function(d) {
		return d.depth <= 3 && d.dx > 5e-5;
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
				return d.__color = color(i % 10);
			})
			.style('color', function(d, i) {
				// ditto
				return d.__color;
			})
			.on('mouseover', function(evt) {
				// if it was locked
				if (pieSelectedPath) {
					// do no update
					return;
				}
				// or whatever
				pieSetSelection(evt);
				analyzeReceivedNode(evt.original);
				// if (evt.depth == 0)
				// 	analyzeReceivedNode();
			})
			.on('click', function(evt) {
				// toggle lock
				d3.selectAll('#pie path.active').classed('active', false);
				if (pieSelectedPath == this) {
					pieSelectedPath = null;
					return;
				}
				if (evt.depth == 0)
					pieSelectedPath = null;
				else
					pieSelectedPath = this;
				d3.select(this).classed('active', true);
				pieSetSelection(evt);
				analyzeReceivedNode(evt.original);
			});
}

/* below is chart */

var chart2_scope = function(){
	var colorize = [];
	var color;
	color = d3.scale.category20b();
	for(i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	color = d3.scale.category20c();
	for(i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	color = d3.scale.category10();
	for(var i=0 ; i<10 ; ++i) colorize.push( color(i) );
	color = d3.scale.category20();
	for(i=0 ; i<20 ; ++i) colorize.push( color(i) );
	var renderBlock = document.querySelector('#studentsBlock');
	var maxWidth = renderBlock.offsetWidth * 0.95;
	var maxHeight = renderBlock.offsetHeight * 0.95;
	var randPos = function(){
		return function(){
			var nowX = Math.random() * maxWidth;
			var nowY = Math.random() * maxHeight;
			return 'translate('+nowX.toFixed(0)+' '+nowY.toFixed(0)+')';
		};
	}();

	var categorySetIcon;
	var categorySetText;
	var categorySetDetail;
	var studentsSet;

	return function(){

		if( items.length <= 0 )
			return true;

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
				return 'translate(28 '+(id*20)+') scale(0.5 0.5)';
			},
			'fill': 'none',
			'd': 'M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z'
		});

		var texts = [];
		for(i=0 ; i<category.length ; ++i){
			texts.push({
				data: category[i].work , colorCode: category[i].colorCode , cid: i
			});
			texts.push({
				data: category[i].num , colorCode: category[i].colorCode , cid: i
			});
		}

		dataBind = d3.select("#iconExplain").selectAll('text').data(texts);
		categorySetText = dataBind.enter().append('text');
		categorySetText.attr({
				'x': function(it,id){
					if( id%2 === 0 ) return '48';
					else return '270';
				},
				'data-x': function(it,id){
					if( id%2 === 0 ) return '48';
					else return '270';
				},
				'y': function(it,id){
					if( id%2 === 0 ) return id*10 + 13;
					else return (id-1)*10 + 13;
				},
				'data-y': function(it,id){
					if( id%2 === 0 ) return id*10 + 13;
					else return (id-1)*10 + 13;
				},
				'fill': function(it){ return it.colorCode; },
				'class': function(it){ return 'cid'+it.cid }
			}).text(function(it){ return it.data; });


		var nowX = 0 , nowY = 0;
		var studentWork = [];
		for(i=0 ; i<category.length ; ++i){
			var to = category[i].num / 100;
			for(var j=0 ; j<=to ; ++j){
				studentWork.push({
					work: category[i].work,
					colorCode: colorize[i],
					pos: randPos(),
					tpos: 'translate('+nowX+' '+nowY+')',
					cid: i
				});
				nowX += 20;
				if(nowX >= maxWidth) {
					nowX = 0;
					nowY += 20;
				}
			}
		}

		dataBind = d3.select("#chart2").selectAll('path').data(studentWork);
		studentsSet = dataBind.enter().append('path');
		studentsSet.attr({
			'stroke': function(it){ return it.colorCode; },
			'stroke-width': '2px',
			'transform': function(it){ return it.pos + ' scale(0 0)'; },
			'fill': 'none',
			'd': 'M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z',
			'class': function(it){ return 'cid'+it.cid }
		});

		studentsSet.transition()
			.duration(800)
			.delay(function(){ return (Math.random()*800).toFixed(0); })
			.attr('transform' , function(it){ return it.pos + ' scale(0.8 0.8)'; });
		studentsSet.transition()
			.duration(800)
			.delay(800)
			.attr('transform' , function(it){ return it.tpos + ' scale(0.5 0.5)'; });

		setTimeout( function(){
			studentsSet.on('mouseover',function(){
				var nowClass = d3.select(this).attr('class');
			})
		} , 2000 );

		return true;
	};
}();
chart2_scope();
