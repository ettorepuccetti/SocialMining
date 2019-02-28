function BarChart(){
    var width = 400, height = 300;
    var label = "access count"
    var svg
    var chart = nv.models.discreteBarChart()
    var data
    var max;
   
    chart.yScale(d3.scale.sqrt());
    chart.showXAxis(false);
    
    chart.discretebar.dispatch.on('elementClick', function(d){
        if (d.data.x == myApp.area()) { myApp.area(null) } 
        else { myApp.area(d.data.x) }
        myApp.updateMap();
    });

    nv.utils.windowResize(function() { chart.update() });

    
    function me(selection) {

        data = selection.datum()

        svg = selection.append("svg")
            .attr({width:"100%", height:height});
            
        me.updateChart()

        return me
    }

    
    me.updateChart = function() {
        svg.datum(prepareData(data))
            .call(chart)

        return me;
    }

    function prepareData(data) {
        var day = myApp.day()
        var filteredDay = data.filter(function(d,i) {
            return (d.timestamp.split("/")[0] == day.split(" ")[0] || day=="ALL")
        })
        if (day=="ALL"){
            filteredDay=groupBy(filteredDay,"area")
        }
        var filteredTen = filteredDay.filter( function(d,i) {
            return (i < 20)
        })
        max = Math.max.apply(null,filteredTen.map(function(d) {return parseInt(d.count)}));
        chart.yDomain([0,max])
        var r = [{
            key: label,
            values: filteredTen.map(function(d) {
                return {key: label, x: d.area, y: d.count};
            })
        }]
        return r
    }

    return me
}