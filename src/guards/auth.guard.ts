import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Socket } from "socket.io";

@Injectable()
export default class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient<Socket>();
        const jwt = client.handshake.headers.authorization;

        

        console.log(client.handshake);
        
        console.log(context.switchToWs().getPattern());
        


        return true
        
    }
}