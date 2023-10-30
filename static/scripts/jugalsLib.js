jugalsLib = {
    defaults: {
        sampleCount: 365,
        interval: 24 * 60 * 60 * 1000,
        minValue: -200,
        maxValue: 500,
        maxDeviationPercentOfRange: 5,
        numberOfSeries : 2
    },
    variables: {
        seriesCounter: 0
    },
    nextValue: function(currValue, options) {
        var settings = $.extend({}, jugalsLib.defaults, options || {}),
            nextValue,
            offset;
        if(settings.minValue>settings.maxValue){
        	return currValue;
        }
        currValue=currValue || (settings.maxValue + settings.minValue) / 2;      
        settings.maxDeviation =
                settings.maxDeviation ||
                (settings.maxValue - settings.minValue) * settings.maxDeviationPercentOfRange / 100;
        while (nextValue === undefined || nextValue < settings.minValue || nextValue > settings.maxValue) {
            offset = Math.random() * settings.maxDeviation * 2;
            nextValue = currValue - settings.maxDeviation + offset;
        }
        return nextValue;
    },
    createSeries: function(options) {
        var settings = $.extend({}, jugalsLib.defaults, options || {}),
            data = [],
            currValue,
            i, 
            time,
            valuePair;
        jugalsLib.variables.startTime = 
            	jugalsLib.variables.startTime ||
            	new Date().getTime() - settings.interval * settings.sampleCount;
        time = jugalsLib.variables.startTime;
        for (i = 0; i < settings.sampleCount; i++) {
            currValue = jugalsLib.nextValue(currValue, settings);
            valuePair = [];
            time += settings.interval;
            valuePair.push(time);
            valuePair.push(currValue);
            data.push(valuePair);
        }
        return {
            name: 'Series ' + jugalsLib.variables.seriesCounter++,
            data: data
        };
    }    
};

jugalsLib.getBasicChartOptions = function(numberOfSeries,seriesOptions) {
    var options = {
        chart: {
            renderTo: 'container'
        },
        title: {
            text: 'Jugal\'s Playground'
        },
        subtitle: {
            text: '<a href="http://ahumbleopinion.com/category/highcharts/">Highcharts @ A Humble Opinion</a>',
            useHTML: true
        },
        rangeSelector: {
            selected: 1
        },        
        credits: {
            text: "Jugal Thakkar",
            href: "http://jugal.me/"
        }
    };
    numberOfSeries = numberOfSeries || jugalsLib.defaults.numberOfSeries;
    if(numberOfSeries>0){
        var i;
        options.series=[];        
        for(i=0;i<numberOfSeries;i++)
            options.series.push(jugalsLib.createSeries(seriesOptions));
    }
    return options;
};
