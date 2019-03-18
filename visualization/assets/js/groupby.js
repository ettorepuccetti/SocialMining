 var groupBy = function(xs, key) {
    var h1 = myApp.hour1()
	var h2 = myApp.hour2()
    var arrayDict = [];
    var rv = xs.reduce(function(rv, x) {
        if (rv[x[key]] && parseInt(x["hour"]) >= parseInt(h1) && parseInt(x["hour"]) < parseInt(h2)) {
         rv[x[key]] = [parseInt(rv[x[key]])+parseInt(x["count"]) , x["lat"], x["lon"]]
        }
        else if (parseInt(x["hour"]) >= parseInt(h1) && parseInt(x["hour"]) < parseInt(h2)){
                rv[x[key]] = [parseInt(x["count"]),x["lat"], x["lon"]];
            } 
        return rv;
    }, {});
    for (elem in rv) {
        var rv_formatted = {"area": elem, "count": rv[elem][0],"lat": rv[elem][1],"lon": rv[elem][2]};
        arrayDict.push(rv_formatted);
    }
    return arrayDict;
};