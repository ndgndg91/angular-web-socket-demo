import {Component, OnInit} from '@angular/core';
import {ChatRoomService} from '../../services/chat/chat-room.service';
import {ChatRoom} from '../../classes/chat-room';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chatRooms: Array<ChatRoom>;

  constructor(private chatRoomService: ChatRoomService) { }

  ngOnInit(): void {
    this.chatRoomService.findChatRooms().subscribe((data) => {
      this.chatRooms = data;
    });
  }

}
