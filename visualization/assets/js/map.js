function MyMap () {
    var width = 400, height = 300;
    var label = "access count"
    var svg;
    var mymap;
    var accessToken = "pk.eyJ1Ijoicm9iZXJ0b3B1Y2NldHRpIiwiYSI6ImNrZ3Fmd2ZmaDBsMnIzMGw4cndzeDVxdnEifQ.XUBdDX7tAxYNneJw2cJFGw";
    var data;
    var circlearray = [];   
    function me (selection) {
        mymap = L.map('mapid').setView([43.712, 10.40], 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: accessToken
        }).addTo(mymap);
  
        data = selection.datum();

        svg = selection.append("svg")
            .attr({width:"100%", height:height})
        
        me.drawCircles();
        
        return me;
    }

    me.deleteCircles = function () {
       circlearray.forEach(d => {
            mymap.removeLayer(d)          
       }); 
    }

    me.drawCircles = function (area) {
        var day = myApp.day();
        var hour = myApp.hour();
        
        var filteredDay = data.filter(function(d,i) {
            return (d.timestamp == day || day=="ALL")
        })


//         if (day=="ALL"){
        filteredDay=groupBy(filteredDay,"area")
//        }

        if (area) {
            var filteredDay = filteredDay.filter( d => {
                return d.area == area;
            })
        }

        filteredDay.forEach(d => {
            var color = "grey"
            if (area) {
                if (d.area = area) color = "red"
                else color = "grey"
            }
            var circle = L.circle([d.lat, d.lon], 
                {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.5,
                    radius: Math.sqrt(d.count) * 4.0/Math.PI
                    
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