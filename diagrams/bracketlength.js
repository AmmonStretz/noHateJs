generateDiagram(
  'Eingeklammerte Bereiche',
  (() => {
    let min = 0;
    let max = 4;
    let stepsize = 5;
    
    let view = generateDataView(true, onlyTrueAndFalse);

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
      addToView(filter, data, view);
    });
    return view;
  })()
);
