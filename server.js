const fs = require('fs');
const http = require('http');
const ws = require('ws');
const wss = new ws.Server({noServer: true});
const clients = new Set();

var DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var newData;

http.createServer((req, res) => {
  fs.readFile("./directoryToBeDetermined", function (err, data) {
    if (err) {
      console.log("404: HTML file does not exist!");
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("<body style='text-align: center'><h1><b><u>404 Error</u></b></h1><h2>Page not found.  :(</h2></body>");
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    }
  });
}).listen(80);

http.createServer((req, res) => {
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
}).listen(81);

function onSocketConnect(ws) {

  clients.add(ws);
  console.log("+1");
  ws.send(JSON.stringify(DATA));

  ws.on('message', function(message) {
    newData = "" + message;
    if (newData == "ping") {
      ws.send("ping");
    } else {
      if (newData == "new") {
        DATA.push(0);
      } else {
        var bin = parseInt(newData.substring(newData.length-1, newData.length));
        var box = parseInt(newData.substring(0, newData.length-1));
        if (box < 0 || box > DATA.length - 1) {
          ws.send("Error: You must pick a number between 0 and " + (DATA.length).toString() + ".");
        } else {
          DATA[box] = bin;
          for(let client of clients) {
            client.send(JSON.stringify(DATA));
          }
        }
      }
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
    console.log("-1");
  });

}
