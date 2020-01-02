generateDiagram(
  'Eingeklammerte Bereiche',
  (() => {
    let min = 0;
    let max = 20;
    let stepsize = 5;
    let view = [
      {
        type: 'stackedColumn',
        dataPoints: []
      },
      {
        type: 'stackedColumn',
        dataPoints: []
      }
    ];

    const bracketContentLength = text => {
      var found = [],
        rxp = /\(.*?\)/g;
      var len = 0;
      var result;
      while ((result = rxp.exec(text)) !== null) {
        len += result[0].length-2;
      }
      return len;
      
    };
    bracketContentLength('asdasd (sdasd) aasasd (123123) asdasd');

    let filters = [];
    for (let i = min; i < max; i++) {
      filters.push({
        name: i * stepsize + ' - ' + ((i + 1) * stepsize - 1),
        f: el =>
          new RegExp(/\(*\)/g).test(el.text) &&
          bracketContentLength(el.text) >= i * stepsize &&
          bracketContentLength(el.text) < (i + 1) * stepsize
      });
    }

    filters.forEach(filter => {
      let filtered = data.filter(filter.f);
      let res = calcMetrics(filtered);
      view[0].dataPoints.push({
        y: res.tp + res.tn,
        label: filter.name
      });
      view[1].dataPoints.push({
        y: res.fp + res.fn,
        label: filter.name
      });
    });
    return view;
  })()
);
