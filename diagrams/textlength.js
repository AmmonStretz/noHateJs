generateDiagram(
  'TextLänge',
  (() => {
    let min = 60;
    let max = 100;
    let stepsize = 4;
    
    let view = generateDataView(false, onlyTrueAndFalse);

    let filters = [];
    for (let i = min; i < max; i++) {
      filters.push({
        name: i * stepsize + ' - ' + ((i + 1) * stepsize - 1),
        f: el => el.text.length >= i * stepsize && el.text.length < (i + 1) * stepsize
      });
    }
    filters.push({ name: stepsize * max + ' < ', f: el => el.text.length >= stepsize * max });

    filters.forEach(filter => {
      addToView(filter, data, view);
    });
    return view;
  })()
);