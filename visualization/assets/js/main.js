function app(){
    
    var DateFormatter = d3.time.format("%d/%m/%Y");
    var day = DateFormatter(new Date("December 31 2018 00:00"))
    var hour = "ALL"
    var hour1 = 0
    var hour2 = 24
    var area
    var barchart
    var toolbarday
    var map
    var dati
       
    //var fs = require('fs');
    
    function me(){
    // calendar
        Calendar()

        d3.csv("assets/data/access_per_day_per_ora.csv",function(error, data){
            if (error) throw error

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
            d3.select("#graph")
                    .datum(data)
                    .call(barchart);      
        
            //map
            map = MyMap();
            d3.select("#mapid")
                    .datum(data)
                    .call(map);
            
            // linechart
            linechart = lineChart();
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

    me.dati = function(_){
        if(!arguments.length) return dati;
        dati = _;
    }

    me.updateMap = function() {
        if (!area) map.deleteCircles();
        map.drawCircles(area);
    }

    me.updateChart = function() {
        barchart.updateChart(day)
    }
    
    me.updateLineChart = function() {
        linechart.updateLineChart(day)
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



