function cumulativelinechart(){
    var width = 400, height = 700;
    var label = "comparative access count"
    var svg
    var chart = nv.models.cumulativeLineChart()
    var data
    var day = "23 Oct"
    var area;
    var max;
    var parser =  d3.time.format('%d/%m/%Y');
   
    chart.yScale(d3.scale.sqrt())
        .color(d3.scale.category10().range())
        .useInteractiveGuideline(true);
    
        chart.xAxis
        .tickValues(["10/23/2018","10/24/2018","11/9/2018","11/10/2018","11/11/2018","11/12/2018"].map(
            function(d) {return parser.parse(d).getTime()}
        ))
        .tickFormat(function(d) {
           return parser(new Date(d))
        });
    
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
        dataTen = data.filter( function(d,i) {return i < 10})
        max = Math.max.apply(null,dataTen.map(function(d) {return parseInt(d.count)}));
        chart.yDomain([0,max])
        return groupByLine(dataTen,"area")
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

