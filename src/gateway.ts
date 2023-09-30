import { WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: /^\/\w+$/, cors: true, origin: ['http://localhost:4201', 'http://localhost:4200'] })
export class Gateway implements OnGatewayConnection, OnGatewayInit {
    // server class
    @WebSocketServer()
    readonly server: Server;

    // on gateway init
    afterInit(server: Server) {
        server.use((socket, next) => {
            try {
                // Passa al prossimo middleware
                next();
            } catch (error) {
                // Se l'autenticazione fallisce, chiudi la connessione
                socket.disconnect(true);
            }
        });
    }

    handleConnection(client: Socket) {
        const room = client.nsp.name.split('/')[1];   
        client.join(room);
    }
}