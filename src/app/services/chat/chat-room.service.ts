import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChatRoom} from '../../classes/chat-room';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private chatRoomsEndpoint = environment.chatRoomsEndpoint;

  constructor(private client: HttpClient) { }

  findChatRooms(): Observable<Array<ChatRoom>>{
    return this.client.get<Array<ChatRoom>>(this.chatRoomsEndpoint).pipe();
  }
}
