function MyMap () {
    var mymap;
    var accessToken = "pk.eyJ1Ijoicm9iZXJ0b3B1Y2NldHRpIiwiYSI6ImNqc2N5NzhmZTAxYXgzeXA0a2pyeGdpMDkifQ.1BIHGcbJ7OFoF8E04c5dng";
    var data;
    var circlearray = [];
    var day = "23 Oct";

    function me (selection) {
        mymap = L.map('mapid').setView([43.712, 10.40], 12);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: accessToken
        }).addTo(mymap);

        data = selection.datum();
        
        me.drawCircles(day);
        
        return me;
    }

    me.deleteCircles = function () {
       circlearray.forEach(d => {
            mymap.removeLayer(d)          
       }); 
    }

    me.drawCircles = function (day,area) {

        var filteredDay = data.filter(function(d,i) {
            return (d.timestamp.split("/")[0] == day.split(" ")[0] || day=="ALL")
        })

         if (day=="ALL"){
            filteredDay=groupBy(filteredDay,"area")
        }

        if (area) {
            var filteredDay = filteredDay.filter( d => {
                return d.area == area;
            })
        }

        filteredDay.forEach(d => {
            var circle = L.circle([d.lat, d.lon], 
                {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: Math.sqrt(d.count) * 2.0
                })
            circle.bindPopup(d.area + "<br /> accessi: "+ d.count);
            circle.on('mouseover', e => {circle.openPopup();})
            circle.on('mouseout', e => {circle.closePopup();})
            circle.addTo(mymap);
            circlearray.push(circle);
            if (area) {
                mymap.setView([d.lat,d.lon]);
            }
        });
        return me;
    }
    
    return me;
    
}