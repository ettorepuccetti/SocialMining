function app(){
    
    var day = "ALL"
    var hour = "ALL"
    var hour1 = 0
    var hour2 = 24
    var area
    var barchart
    var toolbarday
    var map

    
    //var fs = require('fs');
    
    function me(){
 

        // calendar
        Calendar()

        // toolbar hours
        toolbarhour = ToolbarHours();
        d3.select("#toolbar_hour")
            .call(toolbarhour)
        d3.select("#toolbar_hour").select("div.btn-group") 
            .selectAll("button") 
            .classed("active",function(d){return d==hour}) 
            .classed("btn-primary",function(d){return d==hour});


        // barchart
        barchart = BarChart();
        d3.csv("assets/data/access_per_day_per_ora.csv",function(error, data){
            if (error) throw error
            d3.select("#graph")
                .datum(data)
                .call(barchart)
        });

        //map
        map = MyMap();
        d3.csv("assets/data/access_per_day_per_ora.csv",function(error, data){
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

    me.calendar = function(_){
        if(!arguments.length) return calendar;
        calendar = _;
    }

    me.day = function(_){
        if(!arguments.length) return day;
        day = _;
    }

    me.hour = function(_){
        if(!arguments.length) return hour;
        hour = _;
    }
    
    me.hour1 = function(_){
        if(!arguments.length) return hour1;
        hour1 = _;
    }
    
    me.hour2 = function(_){
        if(!arguments.length) return hour2;
        hour2 = _;
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

    me.clearMap = function() {
        map.deleteCircles()
    }  
    
    me.drawMap = function(area) {
        map.drawCircles()        
    }


    return me;
}


var myApp = app();
d3.select("#viz")
    .call(myApp)



