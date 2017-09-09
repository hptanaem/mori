var viewlist;
var chart;

anychart.onDocumentReady(function() {
    // Adds data.
    data = getdaysmean();
    
    chart = anychart.line();
    chart.padding(10, 0, 10, 50);
    chart.title('Mean');    

    var series = chart.line(data);
    series.stroke(color_graph, 1, "round");
    series.hoverStroke(color_graph, 2, "round");
    series.selectStroke(color_graph, 4, "round");
    
    var yScale = chart.yScale();
    yScale.minimum(30);
    yScale.maximum(33);
    chart.xScroller(false);
    
    // adding a listener
    chart.xScroller().listen("scrollerchangefinish", function(e){
        var startRatio = e.startRatio;
        var endRatio = e.endRatio;
    });

    // Zooms series by defined points count.
    // chart.xZoom().setToPointsCount(60, true);
    chart.xZoom().setTo(curscroll_begin, curscroll_end);

    chart.container('container');
    chart.draw();
  
    CreateOEE();

    //create histogram
    bbinning = CalcBins(numdays["1"], numdays[Object.keys(numdays).length-1]);
    CreateHistogram1(bbinning);

    CreateScroller("container_scroller");
    settime_3month();
});

function SingleChart(){
    if (!singlemode){
        singlemode = true;
        // chart3.dispose();
        // chart3 = null;
        // chart4.dispose();
        // chart4 = null;
        chart_oee2.dispose();
        chart_oee2 = null;
        hischart2.dispose();
        hischart2 = null;
        myScroller2.dispose();
        myScroller2 = null;

        curscroll_begin = scroll1_begin;
        curscroll_end = scroll1_end;

        // document.getElementById('container3').style.height='1px';
        // document.getElementById('container4').style.height='1px';
        document.getElementById('container6').style.height='1px';
        document.getElementById('container8').style.height='1px';
        document.getElementById('container_scroller2').style.height='1px';
        document.getElementById('settime_all2').style.height='1px';
        document.getElementById('settime_6mth2').style.height='1px';
        document.getElementById('settime_3mth2').style.height='1px';
        document.getElementById('scroller_timeframe').style.height='1px';
        document.getElementById('label_Scroller1').style.height='1px';
    }
}

function DualChart(){
    if (singlemode)
    {
        singlemode = false;
        // document.getElementById('container3').style.height='400px';
        // document.getElementById('container4').style.height='400px';
        document.getElementById('container6').style.height='400px';
        document.getElementById('container8').style.height='400px';
        document.getElementById('container_scroller2').style.height='60px';
        document.getElementById('settime_all2').style.height='36px';
        document.getElementById('settime_6mth2').style.height='36px';
        document.getElementById('settime_3mth2').style.height='36px';
        document.getElementById('scroller_timeframe').style.height='36px';
        document.getElementById('label_Scroller1').style.height='36px';
        // CreateChart_line2();
        // calc_chartPredict2();
        CreateChart_oee2();
        //create histogram
        bbinning = CalcBins(numdays["1"], numdays[Object.keys(numdays).length-1]);
        CreateHistogram2(bbinning);
        CreateScroller2("container_scroller2");
    }
}

function CreateOEE(){
    chart_oee = anychart.line();
    chart_oee.padding(10, 10, 48, 10);
    series_oee = chart_oee.area(oee);

    chart_oee.xScroller(false);

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
    series_oee2 = chart_oee.area(oee);

    series_oee2.fill("#FDAE01", 0.5);
    series_oee2.hoverFill("#D35400", 0.3);
    series_oee2.selectFill("#BA4A00", 0.5);
    series_oee2.stroke("#873600", 1, "round");

    chart_oee.xScroller(false);

    chart_oee.title('OEE');
    var tooltip_oee2 = series_oee2.tooltip();
    tooltip_oee2.enabled(false);

    // Zooms series by defined points count.
    chart_oee.xZoom().setToPointsCount(60, true);
    var crosshair = chart_oee.crosshair();
    crosshair.enabled(true);
    // crosshair.yStroke(false);
    crosshair.yLabel(false);

    chart_oee.container('container5');
    chart_oee.draw();
}

function CreateHistogram1(bin){

    if (hischart)
    {
        hischart.dispose();
        hischart=null;
    }

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
            if (calcbin.length == 0){
                calcbin = daysbins[key];
            }
            else{
                calcbin = sumarray(calcbin, daysbins[key]);
            }
        }
    }
    return calcbin;
}

function sumarray(array1, array2){
    // var sum = array1.map(function (num, idx) {
    //     return num + array2[idx];
    // });
    var squares = array1.map((a, i) => a + array2[i]);
    return squares;
}

function CreateScroller(container){
    if (myScroller){
        myScroller.dispose();
        myScroller=null
    }

    myScroller = anychart.ui.scroller();
    //myScroller.parentBounds(<left>, <top>, <scroller_length>, <margintop>);
    myScroller.parentBounds(20, 0, 800, 50);
    myScroller.outlineStroke("#D5DBDB", 1, "round");
    // Sets range.
    myScroller.setRange(0.75, 1.0);
    myScroller.selectedFill(color_predict1);

    myScroller.listen("scrollerchange", function(e){
        scroll1_begin = e.startRatio;
        scroll1_end = e.endRatio;

        var nowscroll_begin;
        var nowscroll_end;
        if (!singlemode){
            if (scroll1_begin < scroll2_begin){
                nowscroll_begin = scroll1_begin;
            }
            if (scroll1_end > scroll2_end){
                nowscroll_end = scroll1_end;
            }
        }
        else{
            nowscroll_begin = scroll1_begin;
            nowscroll_end = scroll1_end;
        }

        var Zoom1 = chart.xZoom();
        Zoom1.setTo(nowscroll_begin, nowscroll_end + 0.1);

        var Zoom2 = chart_oee.xZoom();
        Zoom2.setTo(e.startRatio, e.endRatio);
    });

    myScroller.listen("scrollerchangefinish", function(e){
        scroll1_begin = e.startRatio;
        scroll1_end = e.endRatio;

        if (!singlemode){
            if (scroll1_begin < scroll2_begin){
                curscroll_begin = scroll1_begin;
            }
            else{
                curscroll_begin = scroll2_begin;
            }
            if (scroll1_end > scroll2_end){
                curscroll_end = scroll1_end;
            }
            else{
                curscroll_end = scroll2_end;
            }
        }
        else{
            curscroll_begin = scroll1_begin;
            curscroll_end = scroll1_end;
        }

        var Zoom1 = chart.xZoom();
        Zoom1.setTo(curscroll_begin, curscroll_end + 0.1);

        var Zoom2 = chart_oee.xZoom();
        Zoom2.setTo(e.startRatio, e.endRatio);

        setGraph1(e.startRatio, e.endRatio);
        console.log("setGraph1 from scrollerchangefinish CreateScroller");
    });

    myScroller.container(container);
    myScroller.draw();
    setGraph1(curscroll_begin, curscroll_end);
    console.log("setGraph1 from main CreateScroller");
}

function CreateScroller2(container){
    if (myScroller2){
        myScroller2.dispose();
        myScroller2=null
    }

    myScroller2 = anychart.ui.scroller();
    //myScroller.parentBounds(<left>, <top>, <scroller_length>, <margintop>);
    myScroller2.parentBounds(20, 0, 800, 50);
    myScroller2.outlineStroke("#D5DBDB", 1, "round");
    // Sets range.
    myScroller2.setRange(curscroll_begin, curscroll_end);
    myScroller2.selectedFill('#DC7633');

    myScroller2.listen("scrollerchange", function(e){
        scroll2_begin = e.startRatio;
        scroll2_end = e.endRatio;

        var nowscrol2_begin;
        var nowscrol2_end;
        if (!singlemode){
            if (scroll2_begin < scroll1_begin){
                nowscrol2_begin = scroll2_begin;
            }
            if (scroll2_end > scroll1_end){
                nowscrol2_end = scroll2_end;
            }
        }
        else{
            nowscrol2_begin = scroll2_begin;
            nowscrol2_end = scroll2_end;
        }
        var Zoom1 = chart.xZoom();
        Zoom1.setTo(nowscrol2_begin, nowscrol2_end + 0.1);

        var Zoom2 = chart_oee2.xZoom();
        Zoom2.setTo(e.startRatio, e.endRatio);
    });

    myScroller2.listen("scrollerchangefinish", function(e){
        scroll2_begin = e.startRatio;
        scroll2_end = e.endRatio;

        if (!singlemode){
            if (scroll1_begin < scroll2_begin){
                curscroll_begin = scroll1_begin;
            }
            else{
                curscroll_begin = scroll2_begin;
            }
            if (scroll1_end > scroll2_end){
                curscroll_end = scroll1_end;
            }
            else{
                curscroll_end = scroll2_end;
            }
        }
        else{
            curscroll_begin = scroll1_begin;
            curscroll_end = scroll1_end;
        }

        var Zoom1 = chart.xZoom();
        Zoom1.setTo(curscroll_begin, curscroll_end + 0.1);

        var Zoom2 = chart_oee2.xZoom();
        Zoom2.setTo(e.startRatio, e.endRatio);

        setGraph2(e.startRatio, e.endRatio);
    });

    myScroller2.container(container);
    myScroller2.draw();
    settime_3month2();
}

function setGraph1(startRatio, endRatio){
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
        // calc_chart2(myenddate, myenddatenumint);
        new_calcchart1(myenddate, myenddatenumint);

        //create histogram
        bbinning = CalcBins(mystartdate, myenddate);
        CreateHistogram1(bbinning);

        var Zoom2 = chart_oee.xZoom();
        Zoom2.setTo(startRatio, endRatio);
}

function setGraph2(startRatio, endRatio){
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
        // calc_chart2(myenddate, myenddatenumint);
        new_calcchart2(myenddate, myenddatenumint);

        //create histogram
        bbinning = CalcBins(mystartdate, myenddate);
        CreateHistogram1(bbinning);

        var Zoom2 = chart_oee.xZoom();
        Zoom2.setTo(startRatio, endRatio);
}

function new_calcchart1(mydate, myenddatenumint){
    var m = slopedict[mydate];
    var cc = meandict[mydate];

    var predicting_data = [];
    var predicting_date = [];
    for (i = 0; i < 30; i++) { 
        v = (m*i)+cc;
        predicting_data.push(v);
    }

    predicting_date = get_datelist(mydate, predicting_data.length);
    predict_chartdata1 = get_emptychartingdata();
    predict_chartdata1 = get_Appendchartdata(predict_chartdata1, predicting_date, predicting_data);

    draw_predict();
}

function new_calcchart2(mydate, myenddatenumint){
    var m = slopedict[mydate];
    var cc = meandict[mydate];

    var predicting_data = [];
    var predicting_date = [];
    for (i = 0; i < 30; i++) { 
        v = (m*i)+cc;
        predicting_data.push(v);
    }

    predicting_date = get_datelist(mydate, predicting_data.length);
    predict_chartdata2 = get_emptychartingdata();
    predict_chartdata2 = get_Appendchartdata(predict_chartdata2, predicting_date, predicting_data);

    draw_predict();
}

function draw_predict(){
    if (predicted1){
        for (i = 1; i<=chart.getSeriesCount(); i++ )
            if (i = 1)
                chart.removeSeriesAt(i);
    }
    else{
        predicted1 = true;
        chart_predicted_index1 = chart.getSeriesCount();
        console.log("chart_predicted_index2 = " + chart_predicted_index1);
    }
    series1 = chart.line(predict_chartdata1);
    // configure the visual settings of the first series
    series1.stroke(color_predict1, 1, "10 5", "round");
    series1.hoverStroke(color_predict1, 2, "10 5", "round");
    series1.selectStroke(color_predict1, 4, "10 5", "round");

    if (!singlemode){
        series2 = chart.line(predict_chartdata2);
        // configure the visual settings of the first series
        series2.stroke(color_predict2, 1, "10 5", "round");
        series2.hoverStroke(color_predict2, 2, "10 5", "round");
        series2.selectStroke(color_predict2, 4, "10 5", "round");
    }
}

function get_emptychartingdata(){
    return anychart.data.set([]);
}

function add_draw_predictchart1(){
    // create mapping list on one data set
    lineChart = anychart.line(predict_chartdata1);
    console.log("create linechart :::: ");
    console.log(predict_chartdata1);
    console.log("create linechart end :::: ");
    
    // set container id for the chart
    lineChart.title('New York weather');
    lineChart.getSeries(0).name('New York');
    // initiate chart drawing
    lineChart.container(containertest).draw();
}

function get_datelist(mystartdate, mydatalistlenght){
    var startdateindex;
    var i;
    for (i = 0; i < Object.keys(numdays).length; i++) { 
        if(numdays[i]==mystartdate){
            break;
        }
    }
    startdateindex = i;
    var datelist = [];
    var inum = 0;
    for (i = startdateindex; i < startdateindex + mydatalistlenght; i++) {
        if (i > Object.keys(numdays).length){
            // console.log("getdate from Date func")
            var lastdate = parseDate(numdays[Object.keys(numdays).length-1]);
            var newdate = new Date();
            newdate.setDate(lastdate.getDate() + inum);
            newdate = formatDate(newdate);
            datelist.push(newdate);
            inum++;
        }
        else{
            // console.log("getdate from numdays")
            datelist.push(numdays[i]);
        }
    }
    return datelist;
}

function get_Appendchartdata(mychartdata, mydatelist, mydatalist){
    if (mychartdata){
        for (i = 0; i< mydatelist.length; i++){
            // console.log("appending.." + i);
            // console.log("appending....." + mydatelist[i]);
            // console.log("appending....." + mydatalist[i]);
            mychartdata.append( {x: mydatelist[i], value: mydatalist[i]})
        }
        // mychartdata.append( {x:"2017-01-07",value:mydata[0]});
        // data.append({x: "new P"    ,value : 1 });
        return mychartdata;
    }
}

// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function settime_chart1(click_start, click_end){
    scroll1_begin = click_start;
    scroll1_end = 1.1;
    myScroller.setRange(click_start, click_end);

    var Zoom1 = chart.xZoom();
    Zoom1.setTo(click_start, click_end + 0.1);

    var Zoom2 = chart_oee.xZoom();
    Zoom2.setTo(click_start, click_end);

    setGraph1(click_start, click_end);
}

function settime_3month(){
    click_start = 0.57;
    click_end = 1.0;

    settime_chart1(click_start,click_end);
}

function settime_6month(){
    click_start = 0.24;
    click_end = 1.0;

    settime_chart1(click_start,click_end);
}

function settime_all(){
    click_start = 0.0;
    click_end = 1.0;

    settime_chart1(click_start,click_end);
}

function settime_chart2(click_start, click_end){
    if (!singlemode){
        scroll2_begin = click_start;
        scroll2_end = 1.1;
        myScroller2.setRange(click_start, click_end);
        
        var Zoom1 = chart.xZoom();
        Zoom1.setTo(click_start, click_end + 0.1);

        var Zoom3 = chart_oee2.xZoom();
        Zoom3.setTo(click_start, click_end);

        setGraph2(click_start, click_end);
    }
}

function settime_3month2(){
    click_start = 0.57;
    click_end = 1.0;

    settime_chart2(click_start,click_end);
}

function settime_6month2(){
    click_start = 0.24;
    click_end = 1.0;

    settime_chart2(click_start,click_end);
}

function settime_all2(){
    click_start = 0.0;
    click_end = 1.0;

    settime_chart2(click_start,click_end);
}

