var dropdownSamples = d3.select("#selDataset");
console.log(dropdownSamples);
var allData = [];
d3.json("samples.json").then(data => {
    console.log(data);
    allData = data;
    data.names.forEach(element => {
        dropdownSamples.append("option").text(element).property("value", element)
    });
    optionChanged(data.names[0])
})

function optionChanged(sample){
    var samples = allData.samples.filter(d=>d.id==sample)[0];
    var metadata = allData.metadata.filter(d=>d.id==sample)[0];
    console.log(samples);
    var meta = d3.select("#sample-metadata");
    meta.html("");
    Object.entries(metadata).forEach((k,v)=>{
        var a = meta.append("div");
        a.append("span").text(k);
        a.append("span").text(v);
    });
    y_val = samples.otu_ids.slice(0, 10).map(d=>`ID ${d}`).reverse();
    console.log(samples.otu_ids.slice(0, 10));
    bardata = {
        x: samples.sample_values.slice(0, 10).reverse(),
        y: y_val,
        text: samples.otu_labels.slice(0, 10).reverse(),
        type:"bar",
        orientation:"h"
    }
    Plotly.newPlot("bar", [bardata]);

}