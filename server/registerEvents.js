const eventsValues = {};

module.exports = function registerEvents(socket) {
  Object.values(EVENTS).forEach(event => {
    socket.on(event, data => {
      console.log(event, data);

      if (!eventsValues[event]) {
        eventsValues[event] = [];
      }

      eventsValues[event].push(data);

      socket.emit(event, data);
    });
  });
};
