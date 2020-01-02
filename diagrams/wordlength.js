generateDiagram(
  'Durchschnittliche Wortlänge',
  (() => {
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
    let filters = [
      {
        name: 'all',
        f: el => true
      }
    ];
    for (let i = 3; i < 11; i++) {
      filters.push({
        name: i + ' - ' + (i + 1),
        f: el => {
          let ws = el.text.split(' ');
          let len = 0;
          ws.forEach(w => {
            len += w.length;
          });
          return len / ws.length >= i && len / ws.length < i + 1;
        }
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
