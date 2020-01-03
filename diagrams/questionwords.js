generateDiagram(
  'Frageworte',
  (() => {
    const singleWordFilter = word => ({
      name: word,
      f: el => el.text.toLowerCase().includes(word)
    });
    let view = generateDataView(false, onlyTrueAndFalse);
    [
    {
        name: 'all',
        f: el => true
      },
      singleWordFilter('wer '),
      singleWordFilter('wie '),
      singleWordFilter('was '),
      singleWordFilter('wieso '),
      singleWordFilter('weshalb '),
      singleWordFilter('warum ')
    ].forEach(filter => {
      addToView(filter, data, view);
    });
    return view;
  })()
);