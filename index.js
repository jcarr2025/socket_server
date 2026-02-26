const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: { origin: "*" }
});

console.log("Servidor emitiendo números aleatorios...");

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // CORRECCIÓN: Agregamos setInterval antes del paréntesis
  const intervalo = setInterval(() => {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    
    console.log(`Enviando a ${socket.id}: ${numeroAleatorio}`); // Para que veas actividad en la terminal
    
    socket.emit("datos_servidor", { valor: numeroAleatorio });
  }, 1000);

  socket.on("disconnect", () => {
    clearInterval(intervalo);
    console.log("Cliente desconectado, deteniendo emisión.");
  });
});