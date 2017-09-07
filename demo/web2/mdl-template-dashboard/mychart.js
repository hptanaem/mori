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
    
    // adding a listener
    chart.xScroller().listen("scrollerchangefinish", function(e){
        console.log("in scrollerchangefinish...")
        var startRatio = e.startRatio;
        var endRatio = e.endRatio;
        // change the chart title
        // chart.title("The chart shows the part from " + startRatio + " to " + endRatio);
        mydatenum = endRatio * Object.keys(numdays).length;
        mydatenumint = Math.round(mydatenum);
        mydate = numdays[mydatenumint];
        console.log(mydate);
        calc_chart2(mydate);
    });

    // Zooms series by defined points count.
    chart.xZoom().setToPointsCount(60, true);

    chart.container('container');
    chart.draw();
  
    // calc_chart2(numdays[Object.keys(numdays).length-1]);

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

    // adding a listener
    chart3.xScroller().listen("scrollerchangefinish", function(e){
        console.log("in scrollerchangefinish...")
        var startRatio = e.startRatio;
        var endRatio = e.endRatio;
        // change the chart title
        // chart.title("The chart shows the part from " + startRatio + " to " + endRatio);
        mydatenum = endRatio * Object.keys(numdays).length;
        mydatenumint = Math.round(mydatenum);
        mydate = numdays[mydatenumint];
        console.log(mydate);
        calc_chart4(mydate);
    });

    // Zooms series by defined points count.
    chart3.xZoom().setToPointsCount(60, true);

    chart3.container('container3');
    chart3.draw();
}

function calc_chart2(mydate){
        if (chart2){
            chart2.dispose();
            chart2 = null;
        }

        var m = slopedict[mydate];
        var cc = meandict[mydate];

        var v_list = [];
        for (i = 0; i < 30; i++) { 
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

        // get color for gradient
        var colorgradient = Math.round(slopedict[mydate] * 100) / 100;
        if (colorcode[colorgradient] == undefined){
            colorvalue = "#2E86C1";
        }
        else{
            colorvalue = colorcode[colorgradient];   
        }

        // configure the visual settings of the first series
        series2.stroke(colorvalue, 1, "10 5", "round");
        series2.hoverStroke(colorvalue, 2, "10 5", "round");
        series2.selectStroke(colorvalue, 4, "10 5", "round");

        chart2.title('Calculated projection');    
        var tooltip2 = series2.tooltip();
        tooltip2.enabled(false);

        chart2.container('container2');
        chart2.draw();
        
    }

    function calc_chart4(mydate){
        if (chart4){
            chart4.dispose();
            chart4 = null;
        }

        slopedict = getcalcdaysslope();
        meandict = getcalcdaysmean();
        var m = slopedict[mydate];
        var cc = meandict[mydate];

        var v_list = [];
        for (i = 0; i < 30; i++) { 
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

        // get color for gradient
        var colorgradient = Math.round(slopedict[mydate] * 100) / 100;
        if (colorcode[colorgradient] == undefined){
            colorvalue = "#2E86C1";
        }
        else{
            colorvalue = colorcode[colorgradient];   
        }

        // configure the visual settings of the first series
        series4.stroke(colorvalue, 1, "10 5", "round");
        series4.hoverStroke(colorvalue, 2, "10 5", "round");
        series4.selectStroke(colorvalue, 4, "10 5", "round");

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

