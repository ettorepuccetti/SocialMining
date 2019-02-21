function ToolbarDays(){
		
        var toolbar
		
		function me(selection) {
            toolbar = selection;
            // create a selector for Years
            toolbar.append("label")
                .text("Day:");

            daySet =["07 Nov","08 Nov","9 Nov","10 Nov","11 Nov", "12 Nov","ALL"]
            var tbYear = toolbar.append("div")
                .attr({id:"mode-group", class:"btn-group", "data-toggle":"buttons" })
                .selectAll("button")
                .data(daySet)
                .enter()
                .append("button")
                .attr({class:"btn btn-group btn-default", role:"group"})
                .text(function(d){return d})
                .on("click", function(d){ 
                    dispatch.changeDay(d); 
                }); 
	}
    return me
}