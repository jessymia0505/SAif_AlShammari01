import express from "express";
import { createServer as createHttpServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const wss = new WebSocketServer({ server: httpServer });
  const PORT = 3000;

  // Store chat history (in-memory for this demo)
  const messages: any[] = [];

  wss.on("connection", (ws) => {
    console.log("New client connected");
    
    // Send history to new client
    ws.send(JSON.stringify({ type: "history", data: messages }));

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.type === "chat") {
          const chatMsg = {
            id: Date.now(),
            user: message.user || "Anonymous",
            text: message.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          messages.push(chatMsg);
          // Limit history
          if (messages.length > 50) messages.shift();

          // Broadcast to all clients
          const broadcastData = JSON.stringify({ type: "chat", data: chatMsg });
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastData);
            }
          });
        }
      } catch (err) {
        console.error("Error processing message:", err);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
