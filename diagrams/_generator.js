let diagramIndex = 0;
const generateDiagram = (name, view) => {
  var body = document.getElementsByTagName('body')[0],
    newdiv = document.createElement('div');
  newdiv.id = 'diagram' + diagramIndex;
  newdiv.style.width = '100%';
  newdiv.style.height = '370px';
  body.insertBefore(newdiv, body.firstChild);

  let canvas = new CanvasJS.Chart('diagram' + diagramIndex, {
    axisY: {
      suffix: ''
    },
    title: {
      text: name
    },
    data: view
  });
  canvas.render();
  diagramIndex++;
};      