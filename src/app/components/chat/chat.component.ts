import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatMessage} from '../../classes/chat-message';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ChatErrorDialogComponent} from '../../dialogs/chat-error-dialog/chat-error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WebSocketService} from '../../services/web-socket-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  chatFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, public webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
    this.chatFormGroup = this.formBuilder.group({
      writer: new FormControl('', [Validators.required]),
      contents: new FormControl('', [Validators.required])
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  get writer(): any {
    return this.chatFormGroup.get('writer');
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

    console.log(`${this.chatFormGroup.get('writer').value} : ${this.chatFormGroup.get('contents').value}`);
    const chatMessage = new ChatMessage(this.chatFormGroup.get('writer').value, this.chatFormGroup.get('contents').value);
    this.webSocketService.sendMessage(chatMessage);
    this.chatFormGroup.reset();
  }

  getFormValidationErrors(): string {
    let message = '';
    Object.keys(this.chatFormGroup.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.chatFormGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          if (key === 'writer') {
            message += '작성자는 필수입니다! ';
          }
          if (key === 'contents') {
            message += '내용은 필수입니다!';
          }
        });
      }
    });

    return message;
  }

}
