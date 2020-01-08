generateDiagram(
  'Sonderzeichen',
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
      },{
        name: 's[a-zA-Z]$',
        f: el =>
          new RegExp(/\s[a-zA-Z]$/g).test(el.text)
      },{
        name: '[A-Z][A-Z]+',
        f: el =>
          new RegExp(/[A-Z][A-Z]+/g).test(el.text)
      }
    ].forEach(filter => {
      addToView(filter, data, view);
    });
    return view;
  })()
);