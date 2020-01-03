generateDiagram(
  'Personalpronomen',
  (() => {
    let testLowerCase = word => ({
      name: word,
      f: el =>
        new RegExp(' ' + word + ' ').test(el.text) ||
        new RegExp(' ' + word.toLowerCase() + ' ').test(el.text)
    });
    
    let view = generateDataView(false, onlyTrueAndFalse);
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
      addToView(filter, data, view);
    });
    return view;
  })()
);