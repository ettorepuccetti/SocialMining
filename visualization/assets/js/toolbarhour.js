function ToolbarHours(){
		
        var toolbar
		
		function me(selection) {
            toolbar = selection;
            // create a selector for hours
            toolbar.append("label")
                .text("Hour:");

            hourSet =["00-08","08-10","10-12","12-14","14-16", "16-18","18-20","20-24","ALL"]
            var tbYear = toolbar.append("div")
                .attr({id:"mode-group", class:"btn-group", "hour-toggle":"buttons" })
                .selectAll("button")
                .data(hourSet)
                .enter()
                .append("button")
                .attr({class:"btn btn-group btn-default", role:"group"})
                .text(function(d){return d})
                .on("click", function(d){ 
                    dispatch.changeHour(d); 
                }); 
	}
    return me
}