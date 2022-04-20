import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage} from '../../classes/chat-message';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ChatErrorDialogComponent} from '../../dialogs/chat-error-dialog/chat-error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WebSocketService} from '../../services/chat/web-socket-service';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../classes/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  private roomId: string;
  user: User;
  chatFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private authService: AuthService,
              private activatedRoute: ActivatedRoute, private jwtHelperService: JwtHelperService,
              public webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.user = this.jwtHelperService.decodeToken<User>(localStorage.getItem('token'));
    this.roomId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.roomId);
    console.log(this.user);
    console.log(this.user.userName);
    this.webSocketService.openWebSocket();
    // TODO : 입장 메세지, 퇴장 메세지 구현
    this.chatFormGroup = this.formBuilder.group({
      contents: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  get contents(): any {
    return this.chatFormGroup.get('contents');
  }

  sendMessage(): void {
    if (this.chatFormGroup.invalid) {

      const dialogRef = this.dialog.open(ChatErrorDialogComponent, {data: {errorMessage: this.getFormValidationErrors()}});

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      return;
    }

    console.log(`${this.user.userName} : ${this.chatFormGroup.get('contents').value}`);
    const chatMessage = ChatMessage.chat(this.roomId, this.user.userName, this.chatFormGroup.get('contents').value);
    this.webSocketService.sendMessage(chatMessage);
    this.chatFormGroup.reset();
  }

  getFormValidationErrors(): string {
    let message = '';
    Object.keys(this.chatFormGroup.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.chatFormGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(() => {
          if (key === 'contents') {
            message += '내용은 필수입니다!';
          }
        });
      }
    });

    return message;
  }

}
