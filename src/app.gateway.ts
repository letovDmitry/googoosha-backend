import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway(80, {
    cors: {
      origin: '*',
    },
})
export class AppGateway
 implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
 constructor(private messagesService: MessagesService) {}
 
 @WebSocketServer() server: Server;
 
 @SubscribeMessage('sendMessage')
 async handleSendMessage(client: Socket, payload: any): Promise<void> {
    console.log(payload)
   await this.messagesService.createMessage(payload.chatId, payload.senderId, payload.receiverId, payload.text);
   this.server.emit('recMessage', payload);
 }
 
 afterInit(server: Server) {
   console.log(server);
   //Do stuffs
 }
 
 handleDisconnect(client: Socket) {
   console.log(`Disconnected: ${client.id}`);
   //Do stuffs
 }
 
 handleConnection(client: Socket, ...args: any[]) {
   console.log(`Connected ${client.id}`);
   //Do stuffs
 }
}
