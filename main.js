import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
if(wss){
    console.log("Websocket on port 8080 is working..");
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.on('open', function open() {
    
    ws.send('something');
});
  
//   ws.send('something');
});