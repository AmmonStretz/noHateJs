let diagramIndex = 0;
const generateDiagram = (name, view) => {
  var body = document.getElementsByTagName('body')[0],
    newdiv = document.createElement('div');
  newdiv.id = 'diagram' + diagramIndex;
  newdiv.style.width = '100%';
  newdiv.style.height = '370px';
  body.insertBefore(newdiv, body.firstChild);

  let canvas = new CanvasJS.Chart('diagram' + diagramIndex, {
    axisY: {
      suffix: ''
    },
    title: {
      text: name
    },
    data: view
  });
  canvas.render();
  diagramIndex++;
};      

const generateDataView = (percent, taf = false) => {
  if(taf) {
    return [{
      type: percent? 'stackedColumn100': 'stackedColumn',
      color: '#4f81bc',
      legendText: "true",
      showInLegend: true, 
      dataPoints: []
    },
    {
      type: percent? 'stackedColumn100': 'stackedColumn',
      color: '#c0504e',
      legendText: "false",
      showInLegend: true, 
      dataPoints: []
    }]
  }
  return [
    {
      type: percent? 'stackedColumn100': 'stackedColumn',
      color: '#c1e5fa',
      legendText: "tp",
      showInLegend: true, 
      dataPoints: []
    },
    {
      type: percent? 'stackedColumn100': 'stackedColumn',
      color: '#4f81bc',
      legendText: "tn",
      showInLegend: true, 
      dataPoints: []
    },
    {
      type: percent? 'stackedColumn100': 'stackedColumn',
      color: '#f8d6d6',
      legendText: "fp",
      showInLegend: true, 
      dataPoints: []
    },
    {
      type: percent? 'stackedColumn100': 'stackedColumn',
      color: '#c0504e',
      legendText: "fn",
      showInLegend: true, 
      dataPoints: []
    }
  ];
}

const addToView = (filter, data, view) => {
  let filtered = data.filter(filter.f);
  let res = calcMetrics(filtered);  
  if(view.length == 4) {
    view[0].dataPoints.push({
      y: res.tp,
      label: filter.name
    });
    view[1].dataPoints.push({
      y: res.tn,
      label: filter.name
    });
    view[2].dataPoints.push({
      y: res.fp,
      label: filter.name
    });
    view[3].dataPoints.push({
      y: res.fn,
      label: filter.name
    });
  } else {
    view[0].dataPoints.push({
      y: res.tp + res.tn,
      label: filter.name
    });
    view[1].dataPoints.push({
      y: res.fp + res.fn,
      label: filter.name
    });
  }
}