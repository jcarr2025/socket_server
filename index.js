const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: { origin: "*" }
});

console.log("Servidor emitiendo números aleatorios...");

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Creamos un intervalo que se ejecuta cada segundo
  const intervalo = 
  (() => {
    const numeroAleatorio = Math.floor(Math.random() * 100); // Número entre 0 y 99
    
    // Enviamos el dato al cliente con el evento 'datos_servidor'
    socket.emit("datos_servidor", { valor: numeroAleatorio });
  }, 1000);

  // Importante: Limpiar el intervalo cuando el cliente se desconecte
  socket.on("disconnect", () => {
    clearInterval(intervalo);
    console.log("Cliente desconectado, deteniendo emisión.");
  });
});