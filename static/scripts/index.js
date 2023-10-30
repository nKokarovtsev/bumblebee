var dat = JSON.parse('{{ data | tojson | safe }}')
Highcharts.chart('temperature', {
    chart: {
        backgroundColor: 'transparent',
        type: 'areaspline',
        zoomType: 'xy',
        style: {
            fontFamily: 'monospace',
            color: '#ffffff'
        }
    },
    legend: {
        itemStyle: {
            color: '#ffffff'
        }
    },
    credits: {
        enabled: false,
    },
    title: {
        text: 'Data from Bombidarium',
        align: 'center',
        style: {
            color: '#ffffff'
        }
    },
    //color: ['#1C110A', '#E4D6A7', '#E9B44C', '#E9B2915', '#50A2A7'],
    tooltip: {
        animation: false,
        backgroundColor: '#ffffff',
        borderColor: 'red',
        borderRadius: 20,
        followPointer: true,
        style: {
            color: '#000000'
        }
    },
    xAxis: {
        //alternateGridColor: '#050108',
        categories: dat.categories/*['2015', '2015', '2016', '2016', '2017', '2017', '2018', '2018', '2019', '2019', '2020', '2020', '2021', '2021', '2022', '2022', '2023', '2023']*/,
        
        labels: {
            style: {
                color: '#ffffff',
                fontsize: '50px',
            }  
        }
    },
    yAxis: {
        //alternateGridColor: '#ffffff',
        title: {
            text: 'Values',
            position: {
                align: 'center',
                x: 20,
                y: 10
            },
            style: {
                fontsize: '15px',
                color: '#ffffff'
            }
        },
        labels: {
            style: {
                color: '#ffffff',
                fontsize: '50px',
            }  
        }
    },
    series: [{
        title: {
            style: {
                color: '#ffffff',
                fontsize: '15px'
            }  
        },
        name: 'Temperature &degC',
        negativeColor: 'purple',
        data: dat.temperature/*[1, 12, 2, 3, 20, 5, 7, 2, 10, -15, 23, 33, 20, 16, 18, 14, 18]*/,
        //color: 'red'
        fillColor : {
            linearGradient : [0, 0, 0, 300],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(2,0,0,0)']
            ]
          },
    }, 
    {
        name: 'Humidity (%)',
        data: dat.humidity/*[8, 10, 12, 14, 16, 30, 20, 40, 45, 50, 60, 65, 70, 63, 56, 47, 40]*/,
        //color: 'blue'
        fillColor : {
            linearGradient : [0, 0, 0, 200],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(200,0,0,0)']
            ]
          },
    },
    {
        name: 'CO^2 (PPM)',
        data: dat.co2/*[70, 85, 90, 92, 34, 110, 150, 200, 210, 260, 300, 345, 370, 380, 400, 410, 385]*/,
        //color: 'yellow'
        fillColor : {
            linearGradient : [0, 0, 0, 300],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(2,0,0,0)']
            ]
          },
          dataLabels: {
            color: Highcharts.color(Highcharts.getOptions().colors[255]).brighten(-0.5).get()
          }
    },
]
});

Highcharts.chart('massa', {
    chart: {
        backgroundColor: 'transparent',
        type: 'column',
        zoomType: 'xy',
        style: {
            fontFamily: 'monospace',
            color: '#ffffff'
        }
    },
    legend: {
        itemStyle: {
            color: '#ffffff'
        }
    },
    credits: {
        enabled: false,
    },
    title: {
        text: 'Data from Bombidarium',
        align: 'center',
        style: {
            color: '#ffffff'
        }
    },
    //color: ['#1C110A', '#E4D6A7', '#E9B44C', '#E9B2915', '#50A2A7'],
    tooltip: {
        animation: false,
        backgroundColor: '#ffffff',
        borderColor: 'red',
        borderRadius: 20,
        followPointer: true,
        style: {
            color: '#000000'
        }
    },
    xAxis: {
        //alternateGridColor: '#050108',
        categories: dat.categories/*['2015', '2015', '2016', '2016', '2017', '2017', '2018', '2018', '2019', '2019', '2020', '2020', '2021', '2021', '2022', '2022', '2023', '2023']*/,
        
        labels: {
            style: {
                color: '#ffffff',
                fontsize: '50px',
            }  
        }
    },
    yAxis: {
        //alternateGridColor: '#ffffff',
        title: {
            text: 'Values',
            position: {
                align: 'center',
                x: 20,
                y: 10
            },
            style: {
                fontsize: '15px',
                color: '#ffffff'
            }
        },
        labels: {
            style: {
                color: '#ffffff',
                fontsize: '50px',
            }  
        }
    },
    series: [{
        title: {
            style: {
                color: '#ffffff',
                fontsize: '15px'
            }  
        },
        name: '&Delta; Massa',
        negativeColor: 'purple',
        data: dat.mass/*[1, 12, 2, 3, 20, 5, 7, 2, 10, -15, 23, 33, 20, 16, 18, 14, 18]*/,
        //color: 'red'
        fillColor : {
            linearGradient : [0, 0, 0, 300],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(2,0,0,0)']
            ]
          },
    }, 
    {
        name: 'flew in/flew out',
        data: dat.flew/*[8, 10, 12, 14, 16, 30, 20, 40, 45, 50, 60, 65, 70, 63, 56, 47, 40]*/,
        //color: 'blue'
        fillColor : {
            linearGradient : [0, 0, 0, 200],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(200,0,0,0)']
            ]
          },
    },
    {
        name: '&Delta; Lux',
        data: dat.deLux/*[70, 85, 90, 92, 34, 110, 150, 200, 210, 260, 300, 345, 370, 380, 400, 410, 385]*/,
        //color: 'yellow'
        fillColor : {
            linearGradient : [0, 0, 0, 300],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(2,0,0,0)']
            ]
          },
          dataLabels: {
            color: Highcharts.color(Highcharts.getOptions().colors[255]).brighten(-0.5).get()
          }
    },
]
});

Highcharts.chart('microphone', {
    chart: {
        backgroundColor: 'transparent',
        type: 'column',
        zoomType: 'xy',
        style: {
            fontFamily: 'monospace',
            color: '#ffffff'
        }
    },
    legend: {
        itemStyle: {
            color: '#ffffff'
        }
    },
    credits: {
        enabled: false,
    },
    title: {
        text: 'Data from Bombidarium',
        align: 'center',
        style: {
            color: '#ffffff'
        }
    },
    //color: ['#1C110A', '#E4D6A7', '#E9B44C', '#E9B2915', '#50A2A7'],
    tooltip: {
        animation: false,
        backgroundColor: '#ffffff',
        borderColor: 'red',
        borderRadius: 20,
        followPointer: true,
        style: {
            color: '#000000'
        }
    },
    xAxis: {
        //alternateGridColor: '#050108',
        categories: dat.categories/*['2015', '2015', '2016', '2016', '2017', '2017', '2018', '2018', '2019', '2019', '2020', '2020', '2021', '2021', '2022', '2022', '2023', '2023']*/,
        
        labels: {
            style: {
                color: '#ffffff',
                fontsize: '50px',
            }  
        }
    },
    yAxis: {
        //alternateGridColor: '#ffffff',
        title: {
            text: 'Values',
            position: {
                align: 'center',
                x: 20,
                y: 10
            },
            style: {
                fontsize: '15px',
                color: '#ffffff'
            }
        },
        labels: {
            style: {
                color: '#ffffff',
                fontsize: '50px',
            }  
        }
    },
    series: [{
        title: {
            style: {
                color: '#ffffff',
                fontsize: '15px'
            }  
        },
        name: 'Hz',
        data: dat.micrococ/*[1, 12, 2, 3, 20, 5, 7, 2, 10, -15, 23, 33, 20, 16, 18, 14, 18]*/,
        color: 'red',
        fillColor : {
            linearGradient : [0, 0, 0, 300],
            stops : [
              [0, Highcharts.getOptions().colors[2]],
              [1, 'rgba(2,0,0,0)']
            ]
          },
    }, 
]
});