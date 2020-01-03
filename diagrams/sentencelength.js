generateDiagram(
  'Durchschnittliche Satzlänge (in Worten)',
  (() => {
    let min = 0;
    let max = 15;
    let stepsize = 1;
    
    let view = generateDataView(false, onlyTrueAndFalse);
    sentenceLength = (text, from, to) => {
      let nos = text.split(new RegExp('[' + ['/.', '/!', '/?'].join('') + ']', 'g')).length
      let now = text.split(' ').length;
      // console.log(
      //   text.split(new RegExp('[' + ['/.', '/!', '/?'].join('') + ']', 'g')),
      //   text.split(' '),
      //   nos, now, now/nos
      // );
      
      
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
      addToView(filter, data, view);
    });
    return view;
  })()
);
