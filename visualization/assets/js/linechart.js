function lineChart(){
    
    var svg;
    var data;
    var max;
    var width = 800, height = 500;
    var label = "access count";
    var chart = nv.models.lineChart();
    var parser =  d3.time.format('%d/%m/%Y');


    chart.yScale(d3.scale.sqrt())
        .useInteractiveGuideline(true);

    
    var list_ore = []
    for (var i =0; i<24; i++) {
        list_ore.push(i)
    }
    chart.xAxis.tickValues(list_ore);  
        /*
        ["00","04","06","08","10","12","14","16","18","20","24"].map(
            function(d) {return parseInt(d)}
        ));*/


    nv.utils.windowResize(function() { chart.update() });
    
    function me(selection) {

        data = selection.datum()

        svg = selection.append("svg")
            .attr({width:"100%", height:height})
            .datum(prepareData(data))
            me.updateLineChart()
    
        return me
    }


    me.updateLineChart = function() {
        svg.selectAll('.mylegend').remove();
        svg.datum(prepareData(data))
            .call(chart)
            .append("text")
            .attr('class','mylegend')
            .attr("fill", "#000")
            .attr("transform", "translate(100)")
            .attr("y", height-20)
            .attr("x", width/2)
            .attr("dy", "0.71em")
            .attr("text-anchor", "middle")
            .text("Day="+ myApp.day());

        return me;
    }

    function prepareData(data) {
        var day = myApp.day()
        var filteredDay = data.filter(function(d,i) {
            return (d.timestamp == day || day=="ALL")
        })  
        max = Math.max.apply(null,filteredDay.map(function(d) {return parseInt(d.count)}));
        chart.yDomain([0,max])
        dataGrouped = groupByLine(filteredDay,"area")
        dataGrouped = dataGrouped.filter((d,i) => {return i<20})
        return dataGrouped
    }

    var groupByLine = function(xs, key) {
        var h1 = myApp.hour1()
        var h2 = myApp.hour2()
        var arrayDict = [];
        var accumula = 0
        var rv = xs.reduce(function(rv, x) {
 
        if (rv[x[key]]) rv[x[key]].push([x["count"], x["Hour"]])
            else rv[x[key]] = [[x["count"], x["Hour"]]];
        return rv;
        }, {});


        for (elem in rv) {
            coppie_count_ora = rv[elem]
            lista_ore_presenti = coppie_count_ora.map(d => parseInt(d[1]))
            for (var i=0; i<24; i++) {
                if (lista_ore_presenti.indexOf(i) == -1) {
                    coppie_count_ora.push(["0",String(i)])
                }
            }
            coppie_count_ora.sort((a,b) => (a[1] - b[1]))
            var rv_formatted = {
                "key": elem,
                "values": coppie_count_ora.map(d => ( {"x": parseInt(d[1]), "y": d[0]} ))
            };
            arrayDict.push(rv_formatted);
        }
        return arrayDict;
    }

    function sort_object(obj) {
        items = Object.keys(obj).map(function(key) {
            return [obj[key]["key"], obj[key]];
        });
        items.sort(function(a, b) {
            if (a > b ) 
                { 1 }
            else
                {-1}
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

