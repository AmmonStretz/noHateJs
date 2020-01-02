
      // console.log(data);

      // function download(string, filename, type) {
      //   var file = new Blob([string], { type: type });
      //   console.log(string, file);

      //   // return;
      //   var a = document.createElement('a'),
      //     url = URL.createObjectURL(file);
      //   a.href = url;
      //   a.download = filename;
      //   document.body.appendChild(a);
      //   a.click();
      //   setTimeout(function() {
      //     document.body.removeChild(a);
      //     window.URL.revokeObjectURL(url);
      //   }, 0);
      // }

      // const items = data;
      // const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
      // const header = Object.keys(items[0]);
      // // console.log(header);
      // let csv = "";
      // data.forEach(obj => {
      //   csv = csv + '\r\n' + obj.id + "^" + obj.label + "^" + obj.text + "^" + obj.probability + "^" + obj.prediction;
      // });
      // console.log(header+csv);
      // download(header + csv, 'converted.csv', 'csv');

      
      // const sampleSize = 1;
      // let xmlHttp = new XMLHttpRequest();
      // xmlHttp.open( "POST", 'http://localhost:3000/model', false ); // false for synchronous request
      // xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // xmlHttp.send( JSON.stringify({sampleSize}));
      // console.log(xmlHttp.responseText);