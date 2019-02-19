function BarChart(){
    var width = 400, height = 300;
    var label = "access count"
    var svg
    var chart = nv.models.discreteBarChart()
    var data
    var day = "23 Oct"
   

    chart.yDomain([0,800])
    chart.yScale(d3.scale.sqrt())

    chart.showXAxis(false);
            
    
    function me(selection) {

        data = selection.datum()

        svg = selection.append("svg")
            .attr({width:"100%", height:height});
            
        me.updateChart(day)

        return me
    }

    
    me.updateChart = function(selectedDay) {
        day = selectedDay
        svg.datum(prepareData(data))
            .call(chart)

        return me;
    }

    function prepareData(data) {
        var filteredDay = data.filter(function(d,i) {
            return (d.timestamp.split("/")[0] == day.split(" ")[0])
        })
        var filteredTen = filteredDay.filter( function(d,i) {
            return (i < 10)
        })
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