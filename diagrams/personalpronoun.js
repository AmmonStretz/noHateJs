generateDiagram(
  'Personalpronomen',
  (() => {
    let testLowerCase = word => ({
      name: word,
      f: el =>
        new RegExp(' ' + word + ' ').test(el.text) ||
        new RegExp(' ' + word.toLowerCase() + ' ').test(el.text)
    });
    let view = [
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
      testLowerCase('Ich'),
      testLowerCase('Du'),
      testLowerCase('Er'),
      testLowerCase('Sie'),
      testLowerCase('Es'),
      testLowerCase('Wir'),
      testLowerCase('Ihr')
    ].forEach(filter => {
      let filtered = data.filter(filter.f);
      let res = calcMetrics(filtered);
      // console.log(filter.name, res);
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