generateDiagram(
  'Durchschnittliche Satzlänge (in Worten)',
  (() => {
    let min = 0;
    let max = 20;
    let stepsize = 2;
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
    sentenceLength = (text, from, to) => {
      text.replace('...', '.')
      let nos = text.split(new RegExp('[' + ['/.', '/!', '/?'].join('') + ']', 'g')).length
      let now = text.split(' ').length;
      console.log(
        text.split(new RegExp('[' + ['/.', '/!', '/?'].join('') + ']', 'g')),
        text.split(' '),
        nos, now, now/nos
      );
      
      
      return Math.round(now/nos) >= from && Math.round(now/nos) < to;
      
    }

    let filters = [];
    for (let i = min; i < max; i++) {
      filters.push({
        name: i * stepsize + ' - ' + ((i + 1) * stepsize - 1),
        f: el =>
          sentenceLength(el.text, i, i + stepsize)
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
