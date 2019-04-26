function BarChart(){
    var width = 400, height = 300;
    var label = "access count"
    var svg
    var chart = nv.models.discreteBarChart()
    var data
    var max;

    chart.yScale(d3.scale.linear());
    chart.showXAxis(false);
    chart.color(d3.schemeBlues[3]);
    
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
            return (d.timestamp == day || day=="ALL")
        })
        filteredDay=groupBy(filteredDay,"area")
        var filteredDaySorted=sort_object(filteredDay);
        var filtered_n = filteredDaySorted.filter(function(d,i) {
            return (i < 20)
        })
        var filtered_n = filteredDaySorted
        max = Math.max.apply(null,filtered_n.map(function(d) {return parseInt(d.count)}));
        chart.yDomain([0,max])
        var r = [{
            key: label,
            values: filtered_n.map(function(d) {
                return {key: label, x: d.area, y: d.count};
            })
        }]
        return r
    }

    function sort_object(obj) {
        items = Object.keys(obj).map(function(key) {
            return [obj[key]["count"], obj[key]];
        });
        items.sort(function(a, b) {
            return b[0] - a[0];
        });
        sorted_obj=[]

        $.each(items, function(k, v) {
            use_key = k;
            use_value = v[1];
            sorted_obj[use_key] = use_value
        })
        return(sorted_obj)
    }


    return me
}