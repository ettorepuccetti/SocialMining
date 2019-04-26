function lineChart(){
    
    var max;
    var height = 700;
    var chart = nv.models.lineChart()
    var parser =  d3.time.format('%d/%m/%Y');
   
    chart.yScale(d3.scale.sqrt())
        .useInteractiveGuideline(true);

    chart.xAxis
        .tickValues(["00-08","08-10","10-12","12-14","14-16","16-18","18-20","20-24"].map(
            function(d) {return parseInt(d)}
        ));

    nv.utils.windowResize(function() { chart.update() });
    

    function me(selection) {

        var data = selection.datum()

        var svg = selection.append("svg")
            .attr({width:"100%", height:height})
            .datum(prepareData(data))
            .call(chart)
            
        return me
    }


    function prepareData(data) {
        max = Math.max.apply(null,data.map(function(d) {return parseInt(d.count)}));
        chart.yDomain([0,max])
        dataGrouped = groupByLine(data,"area")
        return dataGrouped
    }

    var groupByLine = function(xs, key) {
        var h1 = myApp.hour1()
        var h2 = myApp.hour2()
        var day = myApp.day
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

    return me
}

