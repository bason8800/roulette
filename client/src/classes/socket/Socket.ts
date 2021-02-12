type Events = {
  [key: string]: (...args: any) => any;
};

export abstract class Socket {
  protected socket: SocketIOClient.Socket;

  protected events: Events = {};

  protected constructor(socket: SocketIOClient.Socket) {
    this.socket = socket;
  }

  public registerEvents() {
    for (const [event, handler] of Object.entries(this.events)) {
      this.socket.on(event, (data: any) => {
        handler.bind(this)(data);
      });
    }
  }
}
