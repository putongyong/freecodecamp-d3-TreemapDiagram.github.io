//create the title
    d3.select("main")
    .append("div")
    .attr("id", "title")
    .text("Movie Sales");

    d3.select("main")
    .append("div")
    .attr("id", "description")
    .text("Most Sold Movies Grouped by Platform");

//create the tooltip
    d3.select("body")
    .append("div")
    .attr("id", "tooltip")


    async function getData() {
        const response = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
        const data = await response.json();
        createSVG(data);
      };  
    getData()  
    
function createSVG(data){
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 960 - margin.left - margin.right,
  height = 570 - margin.top - margin.bottom;
    var svg = d3.select("main")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var root = d3.hierarchy(data).sum(function(d){ return d.value})
    
    d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

    const tiles = svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .attr('class','tile')
      .attr("data-name",(d)=>d.data.name)
      .attr("data-category",(d)=>d.data.category)
      .attr("data-value",(d)=>d.data.value)
      .style("stroke", "black")
      .style("fill", (d)=> {
        if(d.data.category ==='Drama'){
            return "slateblue"
        } else if(d.data.category ==='Action'){
            return "green"
        } else if(d.data.category ==='Adventure'){
            return "yellow"
        } else if(d.data.category ==='Family'){
            return "red"
        } else if(d.data.category ==='Animation'){
            return "orange"
        } else if(d.data.category ==='Comedy'){
            return "blue"
        } else {return "brown"}
        })
        .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "visible") 
         })
        .on("mouseover",(e,d) => {
            d3.select("#tooltip")
            .style("position", "absolute")
            .style("background-color","white")
            .style("opacity",".65")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("top", e.pageY+"px")
            .style("left",e.pageX+6+"px")
            .attr("data-value",d.data.value)
            .html(`<p> ${d.data.name} </p>`)
            .style("visibility", "visible")
         })
         .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "hidden")            
         })

         svg        
         .selectAll("text")
         .data(root.leaves())
         .enter()
         .append("text")
           .attr("x", function(d){ return d.x0+5})    
           .attr("y", function(d){ return d.y0+20})    
           .text(function(d){ return d.data.category })
           .attr("font-size", "10px")
           .attr("fill", "black")

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","blue")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 600)
	.attr("y", 550)
    .attr("class","legend-item")

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","green")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 620)
	.attr("y", 550)
    .attr("class","legend-item")

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","yellow")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 640)
	.attr("y", 550)
    .attr("class","legend-item")

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","red")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 660)
	.attr("y", 550)
    .attr("class","legend-item")
    }
