generateDiagram(
  'Politik',
  (() => {
    const singleWordFilter = word => ({
      name: word,
      f: el => el.text.toLowerCase().includes(word)
    });
    
    let view = generateDataView(true, onlyTrueAndFalse);
    [
    {
        name: 'all',
        f: el => true
      },
      singleWordFilter('deutsch'),
      singleWordFilter('politik'),
      singleWordFilter('migrant'),
      singleWordFilter('frau'),
      singleWordFilter('lügen'),
      singleWordFilter('asyl'),
      singleWordFilter('flüchtlinge'),
      {
        name: '*-*',
        f: el=>  new RegExp(/([A-Z][a-z]+\-)+[A-Z][a-z]+/g).test(el.text)
      }
    ].forEach(filter => {
      addToView(filter, data, view);
    });
    return view;
  })()
);