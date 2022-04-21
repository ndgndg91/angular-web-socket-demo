import { Injectable } from '@angular/core';
import {ChatMessage} from '../../classes/chat-message';
import {User} from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor() { }

  openWebSocket(roomId: string, user: User): void {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log(`open`);
      console.log(event);
      const chatMessage = ChatMessage.enter(roomId, user.userName);
      this.webSocket.send(JSON.stringify(chatMessage));
    };

    this.webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
    };

    this.webSocket.onclose = (event) => {
      console.log(`close : ${event}`);
      const chatMessage = ChatMessage.exit(roomId, user.userName);
      this.webSocket.send(JSON.stringify(chatMessage));
    };

    this.webSocket.onerror = (event) => {
      console.error(event);
    };
  }

  sendMessage(chatMessage: ChatMessage): void {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  closeWebSocket(): void {
    this.chatMessages = [];
    this.webSocket.close();
  }
}
