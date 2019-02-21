 var groupBy = function(xs, key) {
    var arrayDict = [];
    var rv = xs.reduce(function(rv, x) {
        if (rv[x[key]]) rv[x[key]] = [parseInt(rv[x[key]])+parseInt(x["count"]) , x["lat"], x["lon"]];
        else rv[x[key]] = [parseInt(x["count"]),x["lat"], x["lon"]];
        return rv;
    }, {});
    for (elem in rv) {
        var rv_formatted = {"area": elem, "count": rv[elem][0],"lat": rv[elem][1],"lon": rv[elem][2]};
        arrayDict.push(rv_formatted);
    }
    return arrayDict;
};