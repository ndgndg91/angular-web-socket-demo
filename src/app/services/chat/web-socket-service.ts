import { Injectable } from '@angular/core';
import {ChatMessage} from '../../classes/chat-message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor() { }

  openWebSocket(): void {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log(`open`);
      console.log(event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      this.chatMessages.push(chatMessage);
    };

    this.webSocket.onclose = (event) => {
      console.log(`close : ${event}`);
    };

    this.webSocket.onerror = (event) => {
      console.error(event);
    };
  }

  sendMessage(chatMessage: ChatMessage): void {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  closeWebSocket(): void {
    this.webSocket.close();
  }
}
