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

    hischart = anychart.area();
    // create a chart
    hischart.animation(true);
    // set the chart title
    hischart.title("Binning Distribution");
    hischart.yScale().minimum(0);
    hischart.barGroupsPadding(0);
    // set the container id
    // set the titles of the axes
    var xAxis = hischart.xAxis();
    xAxis.title("binning");
    var yAxis = hischart.yAxis();
    yAxis.title("");
    hischart.container("container7");
    var labels = hischart.yAxis().labels();
    labels.enabled(false);
    // initiate drawing the chart
    hischart.legend(true);
    hischart.draw();
  
    CreateOEE();

    //create histogram
    hisbinning1 = CalcBins(numdays["1"], numdays[Object.keys(numdays).length-1]);
    CreateHistogram1();

    CreateScroller("container_scroller");
    settime_3month();
});

function SingleChart(){
    if (!singlemode){
        singlemode = true;
        myScroller2.dispose();
        myScroller2 = null;

        curscroll_begin = scroll1_begin;
        curscroll_end = scroll1_end;

        document.getElementById('container_scroller2').style.height='1px';
        document.getElementById('settime_all2').style.height='1px';
        document.getElementById('settime_6mth2').style.height='1px';
        document.getElementById('settime_3mth2').style.height='1px';
        document.getElementById('scroller_timeframe').style.height='1px';
        document.getElementById('label_Scroller2').style.height='1px';
    }
}

function DualChart(){
    if (singlemode)
    {
        singlemode = false;
        document.getElementById('container_scroller2').style.height='60px';
        document.getElementById('settime_all2').style.height='36px';
        document.getElementById('settime_6mth2').style.height='36px';
        document.getElementById('settime_3mth2').style.height='36px';
        document.getElementById('scroller_timeframe').style.height='36px';
        document.getElementById('label_Scroller2').style.height='36px';
        CreateScroller2("container_scroller2");
        settime_3month2();
        CreateHistogram1();
    }
}

function CreateOEE(){
    chart_oee = anychart.line();
    chart_oee.padding(10, 10, 48, 10);
    chart_oee.xScroller(false);
    chart_oee.title('OEE');
    var crosshair = chart_oee.crosshair();
    crosshair.enabled(true);
    crosshair.yLabel(false);
    chart_oee.container('container5');
    chart_oee.draw();
}

function CreateOee1(mystartdate, myenddate){
    oeedatalist1 = [];
    for (i=0; i< Object.keys(numdays).length; i++){
        if (numdays[i] == mystartdate)
            begindate1 = i;
    }
    for (i=0; i< Object.keys(numdays).length; i++){
        if (numdays[i] == myenddate){
            enddate1 = i;
            break;
        }
        enddate1 = Object.keys(numdays).length-1;
    }
    for (i=begindate1; i< enddate1; i++){
        oeedatalist1.push(calcoee[numdays[i]]);
    }
    getdatelist = get_datelist(numdays[begindate1], oeedatalist1.length);
    oeedata1 = get_emptychartingdata();
    oeedata1 = get_Appendchartdata(oeedata1, getdatelist, oeedatalist1);
    drawOEE();
}

function CreateOee2(mystartdate, myenddate){
    oeedatalist2 = [];
    for (i=0; i< Object.keys(numdays).length; i++){
        if (numdays[i] == mystartdate)
            begindate2 = i;
    }
    for (i=0; i< Object.keys(numdays).length; i++){
        if (numdays[i] == myenddate){
            enddate2 = i;
            break;
        }
        enddate2 = Object.keys(numdays).length-1;
    }
    for (i=begindate2; i< enddate2; i++){
        oeedatalist2.push(calcoee[numdays[i]]);
    }
    getdatelist2 = get_datelist(numdays[begindate2], oeedatalist2.length);
    oeedata2 = get_emptychartingdata();
    oeedata2 = get_Appendchartdata(oeedata2, getdatelist2, oeedatalist2);
    drawOEE();
}

function drawOEE(){
    if (oeedrawn){
        for (i = 0; i<=chart_oee.getSeriesCount(); i++ )
            chart_oee.removeSeriesAt(0);
    }
    else{
        oeedrawn = true;
    }

    if (singlemode){
        oeeseries1 = chart_oee.area(oeedata1);
        oeeseries1.name("Mean 1");
        oeeseries1.fill(color_predict1, 0.3);
        var tooltip_oee = oeeseries1.tooltip();
        tooltip_oee.enabled(false);
    }
    else{
        if (begindate1 < begindate2){
        oeeseries1 = chart_oee.area(oeedata1);
        oeeseries1.name("Mean 1");
        oeeseries1.fill(color_predict1, 0.3);
        var tooltip_oee = oeeseries1.tooltip();
        tooltip_oee.enabled(false);
        }
        
        if (!singlemode){   
            oeeseries2 = chart_oee.splineArea(oeedata2);
            oeeseries2.name("Mean  2");
            oeeseries2.fill(color_predict2, 0.3);
            var tooltip_oee = oeeseries2.tooltip();
            tooltip_oee.enabled(false);
        }

        if (begindate1 >= begindate2){
            oeeseries1 = chart_oee.area(oeedata1);
            oeeseries1.name("Mean 1");
            oeeseries1.fill(color_predict1, 0.3);
            var tooltip_oee = oeeseries1.tooltip();
            tooltip_oee.enabled(false);
        }
    }
}

function CreateHistogram1(){
    // create a data set
    hisdata1 = anychart.data.set([
        ["bin1",hisbinning1[0]],
        ["bin2",hisbinning1[1]],
        ["bin3",hisbinning1[2]],
        ["bin4",hisbinning1[3]],
        ["bin5",hisbinning1[4]],
        ["bin6",hisbinning1[5]],
        ["bin7",hisbinning1[6]],
        ["bin8",hisbinning1[7]],
        ["bin9",hisbinning1[8]],
        ["bin10",hisbinning1[9]],
        ["bin11",hisbinning1[10]],
        ["bin12",hisbinning1[11]],
        ["bin13",hisbinning1[12]],
        ["bin14",hisbinning1[13]],
        ["bin15",hisbinning1[14]],
        ["bin16",hisbinning1[15]],
        ["bin17",hisbinning1[16]],
        ["bin18",hisbinning1[17]],
        ["bin19",hisbinning1[18]],
        ["bin20",hisbinning1[19]],
        ["bin21",hisbinning1[20]],
        ["bin22",hisbinning1[21]],
        ["bin23",hisbinning1[22]],
        ["bin24",hisbinning1[23]],
        ["bin25",hisbinning1[24]],
        ["bin26",hisbinning1[25]],
        ["bin27",hisbinning1[26]],
        ["bin28",hisbinning1[27]],
        ["bin29",hisbinning1[28]],
        ["bin30",hisbinning1[29]],
        ["bin31",hisbinning1[30]],
        ["bin32",hisbinning1[31]],
        ["bin33",hisbinning1[32]],
        ["bin34",hisbinning1[33]],
        ["bin35",hisbinning1[34]],
        ["bin36",hisbinning1[35]],
        ["bin37",hisbinning1[36]],
        ["bin38",hisbinning1[37]],
        ["bin39",hisbinning1[38]],
        ["bin40",hisbinning1[39]],
        ["bin41",hisbinning1[40]],
        ["bin42",hisbinning1[41]],
        ["bin43",hisbinning1[42]],
        ["bin44",hisbinning1[43]],
        ["bin45",hisbinning1[44]],
        ["bin46",hisbinning1[45]],
        ["bin47",hisbinning1[46]],
        ["bin48",hisbinning1[47]],
        ["bin49",hisbinning1[48]],
        ["bin50",hisbinning1[49]]
    ]);

    add_draw_hischart1();
}

function add_draw_hischart1(){
    if (!hisdrawn){
        hisdrawn = true;   
    }
    else{
        for (i = 0; i<=hischart.getSeriesCount(); i++ ){
            hischart.removeSeriesAt(0);
        }
    }
    // create a bar series and set the data
    hisseries1 = hischart.splineArea(hisdata1);
    hisseries1.name("Binning frequency - Mean 1");
    hisseries1.fill(color_predict1, 0.3);

    if (!singlemode){   
        // create a bar series and set the data
        hisseries2 = hischart.splineArea(hisdata2);
        hisseries2.name("Binning frequency - Mean  2");
        hisseries2.fill(color_predict2, 0.3);
    }
}

function CreateHistogram2(){
    // create a data set
    hisdata2 = anychart.data.set([
        ["bin1",hisbinning2[0]],
        ["bin2",hisbinning2[1]],
        ["bin3",hisbinning2[2]],
        ["bin4",hisbinning2[3]],
        ["bin5",hisbinning2[4]],
        ["bin6",hisbinning2[5]],
        ["bin7",hisbinning2[6]],
        ["bin8",hisbinning2[7]],
        ["bin9",hisbinning2[8]],
        ["bin10",hisbinning2[9]],
        ["bin11",hisbinning2[10]],
        ["bin12",hisbinning2[11]],
        ["bin13",hisbinning2[12]],
        ["bin14",hisbinning2[13]],
        ["bin15",hisbinning2[14]],
        ["bin16",hisbinning2[15]],
        ["bin17",hisbinning2[16]],
        ["bin18",hisbinning2[17]],
        ["bin19",hisbinning2[18]],
        ["bin20",hisbinning2[19]],
        ["bin21",hisbinning2[20]],
        ["bin22",hisbinning2[21]],
        ["bin23",hisbinning2[22]],
        ["bin24",hisbinning2[23]],
        ["bin25",hisbinning2[24]],
        ["bin26",hisbinning2[25]],
        ["bin27",hisbinning2[26]],
        ["bin28",hisbinning2[27]],
        ["bin29",hisbinning2[28]],
        ["bin30",hisbinning2[29]],
        ["bin31",hisbinning2[30]],
        ["bin32",hisbinning2[31]],
        ["bin33",hisbinning2[32]],
        ["bin34",hisbinning2[33]],
        ["bin35",hisbinning2[34]],
        ["bin36",hisbinning2[35]],
        ["bin37",hisbinning2[36]],
        ["bin38",hisbinning2[37]],
        ["bin39",hisbinning2[38]],
        ["bin40",hisbinning2[39]],
        ["bin41",hisbinning2[40]],
        ["bin42",hisbinning2[41]],
        ["bin43",hisbinning2[42]],
        ["bin44",hisbinning2[43]],
        ["bin45",hisbinning2[44]],
        ["bin46",hisbinning2[45]],
        ["bin47",hisbinning2[46]],
        ["bin48",hisbinning2[47]],
        ["bin49",hisbinning2[48]],
        ["bin50",hisbinning2[49]]
    ]);
    add_draw_hischart1();
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

// to get equal height distribution chart, request by SB
function getmaxbin(){
    hismax1 = 0;
    for (i=0; i < hisbinning1.length-1; i++){
        if (hisbinning1[i] > hismax1)
            hismax1 = hisbinning1[i];
    }

    if (!singlemode){
        hismax2 = 0;
        for (i=0; i < hisbinning2.length-1; i++){
            if (hisbinning2[i] > hismax2)
                hismax2 = hisbinning2[i];
        }
    }

    if (!singlemode){
        if (hismax1 < hismax2){
            hisbinning1 = adduptohismax(hisbinning1, hismax1, hismax2);
        }else{
            hisbinning2 = adduptohismax(hisbinning2, hismax2, hismax1);
        }
    }
}

function adduptohismax(curhisbinning, curhismax, overallhismax){
    var curratio = overallhismax/curhismax;
    for (i=0; i< curhisbinning.length-1;i++){
        curhisbinning[i] = curhisbinning[i]*curratio;
    }
    return curhisbinning;
}

function sumarray(array1, array2){
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

        setGraph1(e.startRatio, e.endRatio);
    });

    myScroller.container(container);
    myScroller.draw();
    setGraph1(curscroll_begin, curscroll_end);
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

        setGraph2(e.startRatio, e.endRatio);
    });

    myScroller2.container(container);
    myScroller2.draw();
    setGraph2(curscroll_begin, curscroll_end);
    settime_3month2();
}

function calc_overallgraph(){
    curscroll_begin
    curscroll_end
    if (curscroll_begin == 0){
        curdate_begin = numdays[1];
    }
    else{
        mystartdatenum = curscroll_begin * Object.keys(numdays).length;
        mystartdatenumint = Math.round(mystartdatenum);
        curdate_begin = numdays[mystartdatenumint];       
    }
    myenddatenum = curscroll_end * Object.keys(numdays).length;
    myenddatenumint = Math.round(myenddatenum);
    curdate_end = numdays[myenddatenumint];
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

    calc_overallgraph();

    // calc_chart2(myenddate, myenddatenumint);
    new_calcchart1(myenddate, myenddatenumint);

    //create histogram
    hisbinning1 = CalcBins(mystartdate, myenddate);
    getmaxbin();
    CreateHistogram1();
    if (!singlemode)
        CreateHistogram2();

    CreateOee1(mystartdate, myenddate);
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

        calc_overallgraph();

        // calc_chart2(myenddate, myenddatenumint);
        new_calcchart2(myenddate, myenddatenumint);

        //create histogram
        hisbinning2 = CalcBins(mystartdate, myenddate);
        getmaxbin();
        CreateHistogram1();
        CreateHistogram2();

        CreateOee2(mystartdate, myenddate);
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
            var lastdate = parseDate(numdays[Object.keys(numdays).length-1]);
            var newdate = new Date();
            newdate.setDate(lastdate.getDate() + inum);
            newdate = formatDate(newdate);
            datelist.push(newdate);
            inum++;
        }
        else{
            datelist.push(numdays[i]);
        }
    }
    return datelist;
}

function get_Appendchartdata(mychartdata, mydatelist, mydatalist){
    if (mychartdata){
        for (i = 0; i< mydatelist.length; i++){
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

    setGraph1(click_start, click_end);
}

function settime_3month(){
    click_start = 0.65;
    click_end = 1.0;

    settime_chart1(click_start,click_end);
}

function settime_6month(){
    click_start = 0.28;
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

        setGraph2(click_start, click_end);
    }
}

function settime_3month2(){
    click_start = 0.65;
    click_end = 1.0;

    settime_chart2(click_start,click_end);
}

function settime_6month2(){
    click_start = 0.28;
    click_end = 1.0;

    settime_chart2(click_start,click_end);
}

function settime_all2(){
    click_start = 0.0;
    click_end = 1.0;

    settime_chart2(click_start,click_end);
}

