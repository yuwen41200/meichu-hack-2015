var pieChart = d3.select('#piechart');
var bubbleChart = d3.select('#bubblechart');

pieChart
	.attr('width', 800)
	.attr('height', 800);

bubbleChart
	.attr('width', 800)
	.attr('height', 800);

pieChart.append('rect')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', 60)
	.attr('height', 60)
	.attr('fill', '#232323');


bubbleChart.append('g')
	.attr('fill', '#232323');
