import { Server as OvernightServer } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

class Server extends OvernightServer {
  private readonly SERVER_START_MSG = 'Demo server started on port: ';

  private constructor() {
    super();
  }

  public start(port = 5000): void {
    this.app.listen(port, () => {
      Logger.Imp(this.SERVER_START_MSG + port);
    });
  }
}

export default Server;
