var dispatch = d3.dispatch("changeDay");


dispatch.on("changeDay", function(d){
	newday = d
	myApp.day(d);
	myApp.area(null);
	myApp.updateChart();
	myApp.updateMap();
	console.log("click day", d);
	d3.select("#toolbar_day").select("div.btn-group") 
      .selectAll("button") 
      .classed("active",function(d){return d==newday}) 
      .classed("btn-primary",function(d){return d==newday}); 
});