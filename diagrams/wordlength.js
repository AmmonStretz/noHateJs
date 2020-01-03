generateDiagram(
  'Durchschnittliche Wortlänge',
  (() => {
    
    let view = generateDataView(false, onlyTrueAndFalse);
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
      addToView(filter, data, view);
    });
    return view;
  })()
);
