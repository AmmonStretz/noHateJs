generateDiagram(
  'TextLänge',
  (() => {
    let min = 60;
    let max = 100;
    let stepsize = 4;
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

    let filters = [];
    for (let i = min; i < max; i++) {
      filters.push({
        name: i * stepsize + ' - ' + ((i + 1) * stepsize - 1),
        f: el => el.text.length >= i * stepsize && el.text.length < (i + 1) * stepsize
      });
    }
    filters.push({ name: stepsize * max + ' < ', f: el => el.text.length >= stepsize * max });

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