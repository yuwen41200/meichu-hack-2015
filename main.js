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
	var jsonData = [];
	for(var k in oriData)
		if( oriData[k]>0 )
			jsonData.push({
				work: k,
				num: oriData[k]
			});

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
		}
	}();

	var colorize = [];
	var color = d3.scale.category10();
	for(var i=0 ; i<10 ; ++i) colorize.push( color(i) );
	var color = d3.scale.category20();
	for(var i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	var color = d3.scale.category20b();
	for(var i=0 ; i<20 ; i+=2) colorize.push( color(i) );
	var color = d3.scale.category20c();
	for(var i=0 ; i<20 ; i+=2) colorize.push( color(i) );

	var studentWork = [];
	for(var i=0 ; i<jsonData.length ; ++i){
		var to = jsonData[i].num / 20;
		for(var j=0 ; j<=to ; ++j)
			studentWork.push({
				work: jsonData[i].work,
				colorCode: colorize[i],
				pos: randPos()
			});
	}

	var dataBind = d3.select("#chart2").selectAll('path').data(studentWork);
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
		.attr('transform' , function(it){ return it.pos + ' scale(0.5 0.5)' });

	return null;
}();
