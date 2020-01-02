generateDiagram(
  'Sonderzeichen',
  (() => {
    const singleWordFilter = word => ({
      name: word,
      f: el => el.text.toLowerCase().includes(word)
    });
    let view3 = [
      {
        type: 'stackedColumn100',
        dataPoints: []
      },
      {
        type: 'stackedColumn100',
        dataPoints: []
      }
    ];
    [
    {
        name: 'all',
        f: el => true
      },
      singleWordFilter('('),
      singleWordFilter('!'),
      singleWordFilter('.'),
      singleWordFilter(':'),
      singleWordFilter(';'),
      singleWordFilter('+'),
      singleWordFilter('-'),
      singleWordFilter('*'),
      singleWordFilter('"'),
      singleWordFilter('„'),
      singleWordFilter(')'),{
        name: '(***)',
        f: el =>
          new RegExp(/\(*\)/g).test(el.text)
      }
    ].forEach(filter => {
      let filtered = data.filter(filter.f);
      let res = calcMetrics(filtered);
      // console.log(filter.name, res);
      view3[0].dataPoints.push({
        y: res.tp + res.tn,
        label: filter.name
      });
      view3[1].dataPoints.push({
        y: res.fp + res.fn,
        label: filter.name
      });
    });
    return view3;
  })()
);