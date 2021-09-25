// read in data
var dropdownSamples = d3.select("#selDataset");
console.log(dropdownSamples);
var allData = [];
d3.json("samples.json").then(data => {
    allData = data;
    data.names.forEach(element => {
        dropdownSamples.append("option").text(element).property("value", element)
    });
    optionChanged(data.names[0])
})

// demogrpahic info and bar chart
function optionChanged(sample){
    var samples = allData.samples.filter(d=>d.id==sample)[0];
    var metadata = allData.metadata.filter(d=>d.id==sample)[0];
    var meta = d3.select("#sample-metadata");
    meta.html("");
    console.log(Object.entries(metadata));
    Object.entries(metadata).forEach(([k,v])=>{
        var a = meta.append("div");
        a.append("span").text(`${k}: `);
        a.append("span").text(v);
    });
    y_val = samples.otu_ids.slice(0, 10).map(d=>`OTU ${d}`).reverse();

    var bardata = {
        x: samples.sample_values.slice(0, 10).reverse(),
        y: y_val,
        text: samples.otu_labels.slice(0, 10).reverse(),
        type:"bar",
        orientation:"h"
    }
    Plotly.newPlot("bar", [bardata]);

// bubble chart
    text_val = samples.otu_labels
    var bubbledata = {
        x: samples.otu_ids,
        y: samples.sample_values,
        text: samples.otu_labels,
        mode: "markers",
        marker: {
        size: samples.sample_values,
        color: samples.otu_ids,
        colorscale: "Rainbow"
    }
    };
    var bubble_layout = {
        xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", [bubbledata], bubble_layout);

    gauge(metadata.wfreq);
}

// gauge visual
  function gauge(wfreq) {
  var gaugeData = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: {text: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week'},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 9] },
            steps: [
                { range: [0, 1], color: 'rgb(248, 243, 236)' },
                { range: [1, 2], color: 'rgb(244, 241, 229)' },
                { range: [2, 3], color: 'rgb(233, 230, 202)' },
                { range: [3, 4], color: 'rgb(229, 231, 179)' },
                { range: [4, 5], color: 'rgb(213, 228, 157)' },
                { range: [5, 6], color: 'rgb(183, 204, 146)' },
                { range: [6, 7], color: 'rgb(140, 191, 136)' },
                { range: [7, 8], color: 'rgb(138, 187, 143)' },
                { range: [8, 9], color: 'rgb(133, 180, 138)' },
            ],
        }
    }
];

var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

Plotly.newPlot('gauge', gaugeData, gaugeLayout);
}