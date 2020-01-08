generateDiagram(
  'Religion',
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
      singleWordFilter('islam'),
      singleWordFilter('muslim'),
      singleWordFilter('jude'),
      singleWordFilter('christ'),
      singleWordFilter('kirche'),
      singleWordFilter('synagoge'),
      singleWordFilter('mosche')
    ].forEach(filter => {
      addToView(filter, data, view);
    });
    return view;
  })()
);