anychart.onDocumentLoad(function() {
    // create an instance of a pie chart with data
    var data = [
      {x: "January", value: 10000},
      {x: "February", value: 12000},
      {x: "March", value: 18000},
      {x: "April", value: 11000},
      {x: "May", value: 9000}
    ];

    var data2 = [
      {x: "January", value: 1000},
      {x: "February", value: 1200},
      {x: "March", value: 1800},
      {x: "April", value: 1100},
      {x: "May", value: 900}
    ];

    // create a chart
    var chart = anychart.area();
    chart.xScroller(true);
    var scrollHandler = function(e){
    
    if (chart.container().getContainerElement().getBoundingClientRect().top < 50){
            window.removeEventListener('scroll',scrollHandler)
            chart.draw();
      }
    };
    window.addEventListener('scroll', scrollHandler, false);
    //chart.xZoom()setToPointsCount(2, true);

    // create a line series and set the data
    var series = chart.area(data);
    var series = chart.area(data2);

    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
});