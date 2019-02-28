function app(){
    
    var day = "07 Nov"
    var area
    var barchart
    var toolbarday
    var map
    
    //var fs = require('fs');
    
    function me(){
        // toolbar
        toolbarday = ToolbarDays();
        d3.select("#toolbar_day")
            .call(toolbarday)
        d3.select("#toolbar_day").select("div.btn-group") 
            .selectAll("button") 
            .classed("active",function(d){return d==day}) 
            .classed("btn-primary",function(d){return d==day});


        // barchart
        barchart = BarChart();
        d3.csv("assets/data/access_per_day.csv",function(error, data){
            if (error) throw error
            d3.select("#graph")
                .datum(data)
                .call(barchart)
        });

        //map
        map = MyMap();
        d3.csv("assets/data/access_per_day.csv",function(error, data){
            if (error) throw error
            d3.select("#mapid")
                .datum(data)
                .call(map)
        });

        // linechart
        linechart = lineChart();
        d3.csv("assets/data/access_per_day.csv",function(error, data){
            if (error) throw error
            d3.select("#clcid")
                .datum(data)
                .call(linechart)
        });

    }

    me.day = function(_){
        if(!arguments.length) return day;
        day = _;
    }

    me.area = function(_){
        if(!arguments.length) return area;
        area = _;
    }

    me.updateMap = function() {
        if (!area) map.deleteCircles();
        map.drawCircles(area);
    }

    me.updateChart = function() {
        barchart.updateChart(day)
    }

    return me;
}


var myApp = app();
d3.select("#viz")
    .call(myApp)



