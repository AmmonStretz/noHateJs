generateDiagram(
  'CapitalLetters',
  (() => {
    let min = 20;
    let max = 40;
    let stepsize = 2.5;
    
    let view = generateDataView(false, onlyTrueAndFalse);

    let filters = [];
    for (let i = min; i < max; i++) {
      filters.push({
        name: i * stepsize + ' - ' + ((i + 1) * stepsize - 1),
        f: el => {
          
          const numUpper = 100*(el.text.match(/[a-z]/g) || []).length / el.text.length;
          // console.log(numUpper);
          return numUpper >= i * stepsize && numUpper < (i + 1) * stepsize
        }
      });
    }
    filters.push({ name: stepsize * max + ' < ', f: el => {
      const numUpper = 100*(el.text.match(/[a-z]/g) || []).length / el.text.length;
          // console.log(numUpper);
         return numUpper >= stepsize * max
    } });

    filters.forEach(filter => {
      addToView(filter, data, view);
    });
    console.log(view);
    
    return view;
  })()
);