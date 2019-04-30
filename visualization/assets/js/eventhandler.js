var dispatch = d3.dispatch("changeDay","changeHour");


dispatch.on("changeDay", function(d){
	newday = d
	myApp.day(d);
	myApp.area(null);
	myApp.updateChart();
	myApp.updateLineChart();
	myApp.updateMap();
	console.log("click day", d);
	d3.select("#toolbar_day").select("div.btn-group") 
      .selectAll("button") 
      .classed("active",function(d){return d==newday}) 
      .classed("btn-primary",function(d){return d==newday}); 
});
dispatch.on("changeHour", function(d){
	newhour = d
	myApp.hour(d);
	if (! (newhour == "ALL"))
		{
		myApp.hour1 (newhour.substring(0,2));
		myApp.hour2 (newhour.substring(3,5));		
		}else{myApp.hour1 (0);
			myApp.hour2 (24)
			}
	myApp.updateChart();
	myApp.clearMap();
	myApp.drawMap();
//	myApp.updateMap
	console.log("click hour", d);
	d3.select("#toolbar_hour").select("div.btn-group") 
      .selectAll("button") 
      .classed("active",function(d){return d==newhour}) 
      .classed("btn-primary",function(d){return d==newhour}); 
});