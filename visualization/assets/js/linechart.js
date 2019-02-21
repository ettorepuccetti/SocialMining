function lineChart(){
    var width = 400, height = 700;
    var label = "comparative access count"
    var svg
    var chart = nv.models.lineChart()
    var data
    var day = "07 Nov"
    var area;
    var max;
    var parser =  d3.time.format('%d/%m/%Y');
   
    chart.yScale(d3.scale.sqrt())
        //.color(d3.scale.category10().range())
        .useInteractiveGuideline(true);

    chart.xAxis
        .tickValues(["07/11/2018","08/11/2018","9/11/2018","10/11/2018","11/11/2018","12/11/2018"].map(
            function(d) {return parser.parse(d).getTime()}
        ))
        .tickFormat(function(d) {
           return parser(new Date(d))
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
        max = Math.max.apply(null,data.map(function(d) {return parseInt(d.count)}));
        chart.yDomain([0,max])
        dataGrouped = groupByLine(data,"area")
        return dataGrouped.filter((d,i) => {return i<20})
    }

    var groupByLine = function(xs, key) {
        var arrayDict = [];
        var rv = xs.reduce(function(rv, x) {
            if (rv[x[key]]) rv[x[key]].push([x["count"], x["timestamp"]])
            else rv[x[key]] = [[x["count"], x["timestamp"]]];
            return rv;
        }, {});
        for (elem in rv) {
            var rv_formatted = {
                "key": elem,
                "values": rv[elem].map( d => ( {"x": parser.parse(d[1]).getTime(), "y": d[0]} ))
            };
            arrayDict.push(rv_formatted);
        }
        return arrayDict;
    }

    return me
}

