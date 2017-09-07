var viewlist;
var chart;

anychart.onDocumentReady(function() {
    // Adds data.
    data = getdaysmean();
    
    chart = anychart.line();
    chart.padding(10, 0, 10, 50);
    chart.title('Mean');    

    var series = chart.line(data);
    
    var yScale = chart.yScale();
    yScale.minimum(31);
    yScale.maximum(33);
    chart.xScroller(true);

    chart.listen("mouseDown", function(event){
        // document.getElementById('mytext').innerHTML = chart.splitterPosition();
        console.log(chart.xScroller().position());
    });

    // events
    // create a listener function
    listener = function(e){
        chart.title("The selected range is: " + anychart.format.dateTime(e.firstSelected, 'dd MMM yyyy') + " - " + anychart.format.dateTime(e.lastSelected,'dd MMM yyyy'));
        console.log(e.lastSelected.toString());
    }
    chart.listen("selectedrangechange", listener);

    // Zooms series by defined points count.
    chart.xZoom().setToPointsCount(60, true);

    chart.container('container');
    chart.draw();
  


    data2 = data;
    // var mapping2 = dataTable.mapAs({value: 1});
    chart2 = anychart.line();
    chart2.padding(10, 10, 48, -5);
    series2 = chart2.line(data2);

    var labels2x = chart2.xAxis().labels();
    labels2x.enabled(false);
    var labels2y = chart2.yAxis().labels();
    labels2y.enabled(false);
    var yAxis2 = chart2.yAxis();
    yAxis2.orientation("right");

    chart2.title('Calculated projection');    

    var tooltip2 = series2.tooltip();
    tooltip2.enabled(false);

    chart2.container('container2');
    chart2.draw();



    // CreateChart3();

    // // var mapping2 = dataTable.mapAs({value: 1});
    // chart4 = anychart.line();
    // chart4.padding(10, 10, 48, -5);
    // var series4 = chart4.line(data);

    // var labels4x = chart4.xAxis().labels();
    // labels4x.enabled(false);
    // var labels4y = chart4.yAxis().labels();
    // labels4y.enabled(false);
    // var yAxis4 = chart4.yAxis();
    // yAxis4.orientation("right");

    // chart4.title('Calculated projection');    

    // var tooltip4 = series4.tooltip();
    // tooltip4.enabled(true);

    // chart4.container('container4');
    // chart4.draw();

    // calc_chart2();
    // calc_chart4();
});

function CreateChart3(){
    chart3 = anychart.line();
    chart3.padding(10, 0, 10, 50);
    chart3.title('Mean'); 

    series3 = chart3.line(data);

    var yScale3 = chart3.yScale();
    yScale3.minimum(31);
    yScale3.maximum(33);

    chart3.xScroller(true);

    chart3.listen("mouseDown", function(event){
        // document.getElementById('mytext').innerHTML = chart.splitterPosition();
        console.log(chart3.xScroller().position());
    });

    // events
    // create a listener function
    listener = function(e){
        //chart.title("The selected range is: " + anychart.format.dateTime(e.firstSelected, 'dd MMM yyyy') + " - " + anychart.format.dateTime(e.lastSelected,'dd MMM yyyy'));
        console.log(e.lastSelected.toString());
    }
    chart3.listen("selectedrangechange", listener);

    // Zooms series by defined points count.
    chart3.xZoom().setToPointsCount(60, true);

    chart3.container('container3');
    chart3.draw();
}

function calc_chart2(){
        if (chart2){
            chart2.dispose();
            chart2 = null;
        }

        var m = slopedict["2017-09-07"];
        var cc = meandict["2017-09-07"];

        var v_list = [];
        for (i = 0; i < 20; i++) { 
            v = (m*i)+cc;
            v_str = "{x:"+i+",value:"+v+"};"
            v_list.push(v);
        }       
        chart2 = anychart.line();
        chart2.padding(10, 10, 48, -5);
        series2 = chart2.line(v_list);

        var labels2x = chart2.xAxis().labels();
        labels2x.enabled(false);
        var labels2y = chart2.yAxis().labels();
        labels2y.enabled(true);
        var yAxis2 = chart2.yAxis();
        yAxis2.orientation("right");
        var yScale2 = chart2.yScale();
        yScale2.minimum(31);
        yScale2.maximum(33);

        chart2.title('Calculated projection');    
        var tooltip2 = series2.tooltip();
        tooltip2.enabled(false);

        chart2.container('container2');
        chart2.draw();
    }

    function calc_chart4(){
        if (chart4){
            chart4.dispose();
            chart4 = null;
        }

        slopedict = getcalcdaysslope();
        meandict = getcalcdaysmean();
        var m = slopedict["2017-09-07"];
        var cc = meandict["2017-09-07"];

        var v_list = [];
        for (i = 0; i < 20; i++) { 
            v = (m*i)+cc;
            v_str = "{x:"+i+",value:"+v+"};"
            v_list.push(v);
        }       
        chart4 = anychart.line();
        chart4.padding(10, 10, 48, -5);
        series4 = chart4.line(v_list);

        var labels4x = chart4.xAxis().labels();
        labels4x.enabled(false);
        var labels4y = chart4.yAxis().labels();
        labels4y.enabled(true);
        var yAxis4 = chart4.yAxis();
        yAxis4.orientation("right");
        var yScale4 = chart4.yScale();
        yScale4.minimum(31);
        yScale4.maximum(33);

        chart4.title('Calculated projection');    
        var tooltip4 = series4.tooltip();
        tooltip4.enabled(true);

        chart4.container('container4');
        chart4.draw();
    }

    function stop_calc(){}

    function SingleChart(){
        if (chart3){
            chart3.dispose();
            chart3 = null;
            chart4.dispose();
            chart4 = null;

            document.getElementById('container3').style.height='1px';
            document.getElementById('container4').style.height='1px';
        }
    }

    function DualChart()    {
        if (!chart3)
        {
            document.getElementById('container3').style.height='400px';
            document.getElementById('container4').style.height='400px';
            CreateChart3();
            calc_chart4();
        }
    }