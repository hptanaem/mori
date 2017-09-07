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
    yScale.minimum(30);
    yScale.maximum(33);
    chart.xScroller(true);
    
    // adding a listener
    chart.xScroller().listen("scrollerchangefinish", function(e){
        console.log("in scrollerchangefinish...")
        var startRatio = e.startRatio;
        var endRatio = e.endRatio;
        // change the chart title
        // chart.title("The chart shows the part from " + startRatio + " to " + endRatio);
        if (startRatio == 0){
            mystartdate = numdays[1];
        }
        else{
            mystartdatenum = startRatio * Object.keys(numdays).length;
            mystartdatenumint = Math.round(mystartdatenum);
            mystartdate = numdays[mystartdatenumint];       
        }
        myenddatenum = endRatio * Object.keys(numdays).length;
        myenddatenumint = Math.round(myenddatenum);
        myenddate = numdays[myenddatenumint];
        console.log(myenddate);
        calc_chart2(myenddate);

        //create histogram
        bbinning = CalcBins(mystartdate, myenddate);
        CreateHistogram1(bbinning);
    });

    // Zooms series by defined points count.
    chart.xZoom().setToPointsCount(60, true);

    chart.container('container');
    chart.draw();
  
    // calc_chart2(numdays[Object.keys(numdays).length-1]);
    CreateOEE();

    //create histogram
    bbinning = CalcBins(numdays["1"], numdays[Object.keys(numdays).length-1]);
    CreateHistogram1(bbinning);
});

function CreateChart_line2(){
    chart3 = anychart.line();
    chart3.padding(10, 0, 10, 50);
    chart3.title('Mean'); 

    series3 = chart3.line(data);
    series3.stroke("#FDAE01", 1, "round");
    series3.hoverStroke("#D35400", 2, "round");
    series3.selectStroke("#BA4A00", 2, "round")

    var yScale3 = chart3.yScale();
    yScale3.minimum(30);
    yScale3.maximum(33);

    chart3.xScroller(true);

    // adding a listener
    chart3.xScroller().listen("scrollerchangefinish", function(e){
        console.log("in scrollerchangefinish...")
        var startRatio = e.startRatio;
        var endRatio = e.endRatio;

        if (startRatio == 0){
            mystartdate = numdays[1];
        }
        else{
            mystartdatenum = startRatio * Object.keys(numdays).length;
            mystartdatenumint = Math.round(mystartdatenum);
            mystartdate = numdays[mystartdatenumint];       
        }
        myenddatenum = endRatio * Object.keys(numdays).length;
        myenddatenumint = Math.round(myenddatenum);
        myenddate = numdays[myenddatenumint];
        console.log(myenddate);
        calc_chartPredict2(myenddate);

        //create histogram
        bbinning = CalcBins(mystartdate, myenddate);
        CreateHistogram2(bbinning);
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
    yScale2.minimum(30);
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

function calc_chartPredict2(mydate){
    if (chart4){
        chart4.dispose();
        chart4 = null;
    }

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
    yScale4.minimum(30);
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
        chart_oee2.dispose();
        chart_oee2 = null;
        hischart2.dispose();
        hischart2 = null;

        document.getElementById('container3').style.height='1px';
        document.getElementById('container4').style.height='1px';
        document.getElementById('container6').style.height='1px';
        document.getElementById('container8').style.height='1px';
    }
}

function DualChart()    {
    if (!chart3)
    {
        document.getElementById('container3').style.height='400px';
        document.getElementById('container4').style.height='400px';
        document.getElementById('container6').style.height='400px';
        document.getElementById('container8').style.height='400px';
        CreateChart_line2();
        calc_chartPredict2();
        CreateChart_oee2();
        //create histogram
        bbinning = CalcBins(numdays["1"], numdays[Object.keys(numdays).length-1]);
        CreateHistogram2(bbinning);
    }
}

function CreateOEE(){
    chart_oee = anychart.line();
    chart_oee.padding(10, 10, 48, 10);
    series_oee = chart_oee.area(oee);

    chart_oee.xScroller(true);

    chart_oee.title('OEE');
    var tooltip_oee = series_oee.tooltip();
    tooltip_oee.enabled(false);

    // Zooms series by defined points count.
    chart_oee.xZoom().setToPointsCount(60, true);
    var crosshair = chart_oee.crosshair();
    crosshair.enabled(true);
    // crosshair.yStroke(false);
    crosshair.yLabel(false);

    chart_oee.container('container5');
    chart_oee.draw();
}

function CreateChart_oee2(){
    chart_oee2 = anychart.line();
    chart_oee2.padding(10, 10, 48, 10);
    series_oee2 = chart_oee2.area(oee);

    series_oee2.fill("#FDAE01", 0.5);
    series_oee2.hoverFill("#D35400", 0.3);
    series_oee2.selectFill("#BA4A00", 0.5);
    series_oee2.stroke("#873600", 1, "round");

    chart_oee2.xScroller(true);

    chart_oee2.title('OEE');
    var tooltip_oee2 = series_oee2.tooltip();
    tooltip_oee2.enabled(false);

    // Zooms series by defined points count.
    chart_oee2.xZoom().setToPointsCount(60, true);
    var crosshair = chart_oee2.crosshair();
    crosshair.enabled(true);
    // crosshair.yStroke(false);
    crosshair.yLabel(false);

    chart_oee2.container('container6');
    chart_oee2.draw();
}

function CreateHistogram1(bin){

    if (hischart)
    {
        hischart.dispose();
        hischart=null;
    }

    console.log(bin)
     // create a data set
    var data = anychart.data.set([
        ["bin1",bin[0]],
        ["bin2",bin[1]],
        ["bin3",bin[2]],
        ["bin4",bin[3]],
        ["bin5",bin[4]],
        ["bin6",bin[5]],
        ["bin7",bin[6]],
        ["bin8",bin[7]],
        ["bin9",bin[8]],
        ["bin10",bin[9]],
        ["bin11",bin[10]],
        ["bin12",bin[11]],
        ["bin13",bin[12]],
        ["bin14",bin[13]],
        ["bin15",bin[14]],
        ["bin16",bin[15]],
        ["bin17",bin[16]],
        ["bin18",bin[17]],
        ["bin19",bin[18]],
        ["bin20",bin[19]],
        ["bin21",bin[20]],
        ["bin22",bin[21]],
        ["bin23",bin[22]],
        ["bin24",bin[23]],
        ["bin25",bin[24]],
        ["bin26",bin[25]],
        ["bin27",bin[26]],
        ["bin28",bin[27]],
        ["bin29",bin[28]],
        ["bin30",bin[29]],
        ["bin31",bin[30]],
        ["bin32",bin[31]],
        ["bin33",bin[32]],
        ["bin34",bin[33]],
        ["bin35",bin[34]],
        ["bin36",bin[35]],
        ["bin37",bin[36]],
        ["bin38",bin[37]],
        ["bin39",bin[38]],
        ["bin40",bin[39]],
        ["bin41",bin[40]],
        ["bin42",bin[41]],
        ["bin43",bin[42]],
        ["bin44",bin[43]],
        ["bin45",bin[44]],
        ["bin46",bin[45]],
        ["bin47",bin[46]],
        ["bin48",bin[47]],
        ["bin49",bin[48]],
        ["bin50",bin[49]]
    ]);

    // create a chart
    hischart = anychart.column();

    // create a bar series and set the data
    var series_his = hischart.column(data);
    series_his.name("Binning frequency");
    hischart.animation(true);

    // set the chart title
    hischart.title("Normal Distribution");

    // set the titles of the axes
    var xAxis = hischart.xAxis();
    xAxis.title("binning");
    var yAxis = hischart.yAxis();
    yAxis.title("frequency");
    hischart.yScale().minimum(0);
    hischart.barGroupsPadding(0);

    // set the container id
    hischart.container("container7");

    // initiate drawing the chart
    hischart.draw();
}

function CreateHistogram2(bin){

    if (hischart2)
    {
        hischart2.dispose();
        hischart2=null;
    }

    console.log(bin)
     // create a data set
    var data = anychart.data.set([
        ["bin1",bin[0]],
        ["bin2",bin[1]],
        ["bin3",bin[2]],
        ["bin4",bin[3]],
        ["bin5",bin[4]],
        ["bin6",bin[5]],
        ["bin7",bin[6]],
        ["bin8",bin[7]],
        ["bin9",bin[8]],
        ["bin10",bin[9]],
        ["bin11",bin[10]],
        ["bin12",bin[11]],
        ["bin13",bin[12]],
        ["bin14",bin[13]],
        ["bin15",bin[14]],
        ["bin16",bin[15]],
        ["bin17",bin[16]],
        ["bin18",bin[17]],
        ["bin19",bin[18]],
        ["bin20",bin[19]],
        ["bin21",bin[20]],
        ["bin22",bin[21]],
        ["bin23",bin[22]],
        ["bin24",bin[23]],
        ["bin25",bin[24]],
        ["bin26",bin[25]],
        ["bin27",bin[26]],
        ["bin28",bin[27]],
        ["bin29",bin[28]],
        ["bin30",bin[29]],
        ["bin31",bin[30]],
        ["bin32",bin[31]],
        ["bin33",bin[32]],
        ["bin34",bin[33]],
        ["bin35",bin[34]],
        ["bin36",bin[35]],
        ["bin37",bin[36]],
        ["bin38",bin[37]],
        ["bin39",bin[38]],
        ["bin40",bin[39]],
        ["bin41",bin[40]],
        ["bin42",bin[41]],
        ["bin43",bin[42]],
        ["bin44",bin[43]],
        ["bin45",bin[44]],
        ["bin46",bin[45]],
        ["bin47",bin[46]],
        ["bin48",bin[47]],
        ["bin49",bin[48]],
        ["bin50",bin[49]]
    ]);

    // create a chart
    hischart2 = anychart.column();

    // create a bar series and set the data
    var series_his2 = hischart2.column(data);
    series_his2.name("Binning frequency");
    hischart2.animation(true);

    // set the chart title
    hischart2.title("Normal Distribution");

    // set the titles of the axes
    var xAxis = hischart2.xAxis();
    xAxis.title("binning");
    var yAxis = hischart2.yAxis();
    yAxis.title("frequency");
    hischart2.yScale().minimum(0);
    hischart2.barGroupsPadding(0);

    series_his2.fill("#FDAE01", 1.0);
    series_his2.hoverFill("#D35400", 0.3);
    series_his2.selectFill("#BA4A00", 0.5);
    series_his2.stroke("#873600");

    // set the container id
    hischart2.container("container8");

    // initiate drawing the chart
    hischart2.draw();
}

function CalcBins(startdate, enddate){
    console.log(startdate);
    console.log(enddate);

    var startindex = 1;
    for(var key in daysbins)
    {
        if(key==startdate){
            break;
        }
        startindex++;
    }

    var endindex = 1;
    for(var key in daysbins)
    {
        if(key==enddate){
            break;
        }
        endindex++;
    }

    if (endindex < startindex){
        return false;
    }

    // calc bins
    var calcbin = [];
    bget = false;
    for(var key in daysbins){
        if(key==startdate){
            bget = true;
        }
        if (key==enddate){
            bget= false;
            return calcbin;
        }
        if (bget){
            console.log(key);
            console.log(calcbin);
            if (calcbin.length == 0){
                calcbin = daysbins[key];
            }
            else{
                console.log("adding:");
                console.log(calcbin);
                console.log(daysbins[key]);
                console.log("====");
                calcbin = sumarray(calcbin, daysbins[key]);
                console.log(calcbin);
                console.log("====");
                console.log("====");
            }
        }
    }
    // console.log(calcbin);
    return calcbin;
}

function sumarray(array1, array2){
    // var sum = array1.map(function (num, idx) {
    //     return num + array2[idx];
    // });
    var squares = array1.map((a, i) => a + array2[i]);
    return squares;
}