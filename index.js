var svg;
var width;
var height;
const margin=({top:50,right:20,left:50,bottom:50});
var flight_data;
var dog_data;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var rectSize =150;
var padding=20;
var tooltipdiv;
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv('./data/Flights.csv'),d3.csv('./data/Dogs1.csv')]).then(function(values){
        flight_data = values[0];
        dog_data =values[1];
        drawChart()
        })
})
function drawChart()
{
    
    flight_data.forEach(d => {
         d.year = +d.year
         d.altitude = +d.altitude
    });
    tooltipdiv = d3.select("body").append("div")
              .attr("id", "tooltip-div")
              .style("opacity", 0);
    var allYears = _.chain(flight_data)
    .map('year').uniq().value();
    //console.log(allYears)
    var years = d3.select('.years');
    years.selectAll('.year')
      	.data(allYears).enter().append('h1')
      	.classed('year', true)
      	.style('margin', 0)
      	.style('position', 'absolute')
      	.style('width', rectSize + 'px')
        .style('top', function(d, i) {
        	return i * rectSize * 1.5 + rectSize / 2 +180 + 'px';
        })
        .text(function(d) {return d});
    for (let index = 0; index < allYears.length; index++) {
      var selected_year = allYears[index];
      var filterData= flight_data.filter(function (d) { return d.year===selected_year})
      //console.log("filter data",filterData)
      drawRocket(filterData)
    }  
}

function drawRocket(filterData)
{
  var gallery = d3.select('.content').append('div')
                  .style("margin-left","150px")
                  .style("margin-bottom","125px")
  filterData.forEach(d=>{
                    d.date = new Date(d.date);
                    d.Month = monthNames[d.date.getMonth()]
                    d.Day = d.date.getDate()
                   })                 
  var container = gallery.selectAll('.container')
                          .data(filterData);
  
  container.enter().append('img')
              .attr("class","picture")
              .attr("id",function(d){return d.year})
              .attr('src', function(d) { return d.imgsrc; })
              .on('mouseover', function (d, i) {
                tooltipdiv.transition()
                     .duration(50)
                     .style("opacity", 1);
                     tooltipdiv.html("Type: "+d.rocket+"</br>"+"Flew on: "+ d.Month+" "+d.Day)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
              })
              .on('mousemove', function (d, i) {
                tooltipdiv.transition()
                     .duration(50)
                     .style("opacity", 1);
                     tooltipdiv.html("Type: "+d.rocket+"</br>"+"Flew on: "+d.Month+" "+d.Day)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
              })
              .on('mouseout', function (d, i) {
                tooltipdiv.transition()
                     .duration(50)
                     .style("opacity", 0);
              })
              .on('click', datum => {
                drawDogData(datum);}
              );
              
                                        
}
function drawDogData(filterData)
{
  
  var dogs = filterData.dogs.split(',')
  var filteredDogInfo=  dog_data.filter(function (d) { return d.Name=== dogs[0] || d.Name===dogs[1]})
  //console.log("dogs info",filteredDogInfo);
  $("#myModal").modal('show');
  $('#myModal').draggable();   
  d3.select("#dogimage1").attr("src",filteredDogInfo[0]['imgsrc']);
  d3.select("#dog1").text(filteredDogInfo[0]['Name'])
  d3.select("#doginfo1").text(filteredDogInfo[0]['Name']+" has been on a total of "+filteredDogInfo[0]['counts']+ " flight(s)")
  if(filteredDogInfo[1]!=null)
  {
    d3.select("#dogimage2").attr("src",filteredDogInfo[1]['imgsrc']);
    d3.select("#dog2").text(filteredDogInfo[1]['Name'])
    d3.select("#doginfo2").text(filteredDogInfo[1]['Name']+" has been on a total of "+filteredDogInfo[1]['counts']+ " flight(s)")
  }
 
}