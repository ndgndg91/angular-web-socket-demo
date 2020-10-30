import { Component, OnInit } from '@angular/core';
import {ChatMessage} from '../../classes/chat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];

  constructor() { }

  ngOnInit(): void {
    this.messages.push(new ChatMessage('동길', '안녕!'));
    this.messages.push(new ChatMessage('철수', '할루!'));
  }

}
