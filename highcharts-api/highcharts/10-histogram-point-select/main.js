Highcharts.chart('container', {
    chart: {
        events: {
            load() {
                const chart = this,
                    valueOccurences = {};

                chart.series[0].points.forEach(point => {
                    if(valueOccurences[point.y]) valueOccurences[point.y]++;
                    else valueOccurences[point.y] = 1;
                });

                chart.valueOccurences = valueOccurences;
            }
        }
    },
    
    yAxis: [{
        max: 12, 
    }, {
        opposite: true
    }],
    xAxis: [{
        pointStart: 1,
        opposite: true
    }, {
        minTickInterval: 5      
    }],

    series: [{
        type: 'scatter',
        data: [3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1, 3, 5, 6],
        yAxis: 0,
        xAxis: 1,
        zIndex: 1,
        color: '#434348',
        allowPointSelect: true,
        states: {
            inactive: {
                enabled: false
            }
        }
    }, {
        type: 'histogram',
        baseSeries: 0,
        yAxis: 1,
        xAxis: 0,
        zIndex: -1,
        color: '#7cb4eb',
        states: {
            inactive: {
                enabled: false
            }
        },
        events: {
            click(e) {
                const chart = this.chart;

                chart.series[0].data.forEach(dataPoint => {
                    dataPoint.update({
                        selected: chart.valueOccurences[dataPoint.y] === e.point.y
                    })
                });
            }
        }
    }]
});