function lineChart(){
    
    var svg;
    var data;
    var max;
    var height = 700;
    var chart = nv.models.lineChart()
    var parser =  d3.time.format('%d/%m/%Y');


    chart.yScale(d3.scale.sqrt())
        .useInteractiveGuideline(true);

    chart.xAxis
        .tickValues(["00","04","06","08","10","12","14","16","18","20","24"].map(
            function(d) {return parseInt(d)}
        ));


    nv.utils.windowResize(function() { chart.update() });
    
    function me(selection) {

        data = selection.datum()

        svg = selection.append("svg")
            .attr({width:"100%", height:height})
            .datum(prepareData(data))
            .call(chart)
    
        return me
    }


    me.updateLineChart = function() {
//        svg.select('text').remove()
        svg.datum(prepareData(data))
            .call(chart)
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
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
//        return dataGrouped.filter((d,i) => {return i<20})
        dataGrouped =sort_object(dataGrouped)
        return dataGrouped
    }

        var groupByLine = function(xs, key) {
        var h1 = myApp.hour1()
        var h2 = myApp.hour2()
        var arrayDict = [];
        var accumula = 0
        var rv = xs.reduce(function(rv, x) {
 //       if (rv[x[key]] && parseInt(x["hour"]) >= parseInt(h1) && parseInt(x["hour"]) < parseInt(h2)) {
 //               accumula= parseInt(rv[x[key]][0])+parseInt(x["count"]);
 //               rv[x[key]].push(accumula, x["timestamp"],x["hour"])
 //                   }
 //       else if (parseInt(x["hour"]) >= parseInt(h1) && parseInt(x["hour"]) < parseInt(h2)) {
 //               rv[x[key]] =[x["count"], x["timestamp"],x["hour"]]
 //           }
        if (rv[x[key]]) rv[x[key]].push([x["count"], x["Hour"]])
            else rv[x[key]] = [[x["count"], x["Hour"]]];

        return rv;



        }, {});
        for (elem in rv) {
            var rv_formatted = {
                "key": elem,
                "values": rv[elem].map(d => ( {"x": parseInt(d[1]), "y": d[0]} ))
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

