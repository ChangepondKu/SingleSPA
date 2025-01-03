import { WebSocketServer } from 'ws';

// Correct instantiation of WebSocketServer
let wss;

export const initWebSocket = (server) => {
  wss = new WebSocketServer({ port: 9321 });
  console.log('WebSocket server initialized on port 9321');

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log('Received:', message);
      ws.send(`Server says: ${message}`);
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
};

export const broadcastUpdate = (type, data) => {
  if (!wss) {
    console.error('WebSocket server (wss) is not initialized');
    return;
  }

  const message = JSON.stringify({ type, data });
  console.log('Broadcasting message:', message);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN is equal to 1
      console.log('Message sent to client:', message);
      client.send(message);
    }
  });
};
