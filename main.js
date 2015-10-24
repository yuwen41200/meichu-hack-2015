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
	}
	return list;
}

function createView(viewObj) {
	//yeeinit function about color
	var color = d3.scale.category10();

	pie.append('circle')
		.attr('r', dimension.diameter / 2)
		.style('opacity', 0);

	var nodes = partition.nodes(viewObj).filter(function(d) {
		return d.depth <= 3;
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
				return color(i+1 % 10);
			});
			// .style('')
}

/* below is chart */

var chart2_scope = function(){

	var oriData = {
				"正在接受職業訓練": 4,
				"正在軍中服役": 98,
				"需要工作而未找到": 9,
				"補習或準備升學": 750,
				"健康不良在家休養": 3,
				"準備出國": 4,
				"其他原因": 31,
				"公立大學日間部": 15733,
				"公立大學進修學士班": 73,
				"私立大學日間部": 16005,
				"私立大學進修學士班": 141,
				"公立二專日間部": 0,
				"公立二專夜間部": 1,
				"私立二專日間部": 6,
				"私立二專夜間部": 3,
				"警察大學": 48,
				"警察專科學校": 407,
				"軍事院校": 458,
				"赴國外或大陸就讀": 226,
				"其他學校": 7,
				"農林漁牧業": 1,
				"礦業及土石採取業": 0,
				"製造業": 8,
				"電力及燃氣供應業": 0,
				"用水供應及污染整治業": 0,
				"營造業": 4,
				"批發及零售業": 13,
				"運輸及倉儲業": 1,
				"住宿及餐飲業": 28,
				"資訊及通訊傳播業": 2,
				"金融及保險業": 0,
				"不動產業": 0,
				"專業科學及技術服務業": 1,
				"支援服務業": 7,
				"公共行政及國防或強制性社會安全": 99,
				"教育服務業": 1,
				"醫療保健及社會工作服務業": 0,
				"藝術娛樂及休閒服務業": 4,
				"其他服務業": 16
			};

	// above is data pass to chart

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

	var jsonData = [];
	for(var k in oriData)
		if( oriData[k]>0 )
			jsonData.push({
				work: k,
				num: oriData[k]
			});

	var category = [];
	for(i=0 ; i<jsonData.length ; ++i)
		category.push({
			work: k,
			num: oriData[k],
			colorCode: colorize[i]
		});

	var dataBind = d3.select("#iconExplain").selectAll('path').data(category);
	var categorySet = dataBind.enter().append('path');
	dataBind.exit().remove();
	categorySet.attr({
		'stroke': function(it){ return it.colorCode; },
		'stroke-width': '2px',
		'transform': function(it,id){
			if( id<11 )
				return 'translate(28 '+(id*20)+') scale(0.5 0.5)';
			else if( id<22 )
				return 'translate(178 '+((id-11)*20)+') scale(0.5 0.5)';
			else
				return 'translate(328 '+((id-22)*20)+') scale(0.5 0.5)';
		},
		'fill': 'none',
		'd': 'M21.947,16.332C23.219,14.915,24,13.049,24,11c0-4.411-3.589-8-8-8s-8,3.589-8,8s3.589,8,8,8  c1.555,0,3.003-0.453,4.233-1.224c4.35,1.639,7.345,5.62,7.726,10.224H4.042c0.259-3.099,1.713-5.989,4.078-8.051  c0.417-0.363,0.46-0.994,0.097-1.411c-0.362-0.416-0.994-0.46-1.411-0.097C3.751,21.103,2,24.951,2,29c0,0.553,0.448,1,1,1h26  c0.553,0,1-0.447,1-1C30,23.514,26.82,18.615,21.947,16.332z M10,11c0-3.309,2.691-6,6-6s6,2.691,6,6s-2.691,6-6,6S10,14.309,10,11z'
	});

	
	var studentWork = [];
	for(i=0 ; i<jsonData.length ; ++i){
		var to = jsonData[i].num / 20;
		for(var j=0 ; j<=to ; ++j)
			studentWork.push({
				work: jsonData[i].work,
				colorCode: colorize[i],
				pos: randPos()
			});
	}

	dataBind = d3.select("#chart2").selectAll('path').data(studentWork);
	var studentsSet = dataBind.enter().append('path');
	dataBind.exit().remove();
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

	return null;
};
chart2_scope();
