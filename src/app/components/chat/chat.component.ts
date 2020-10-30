import {Component, OnInit} from '@angular/core';
import {ChatMessage} from '../../classes/chat-message';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ChatErrorDialogComponent} from '../../dialogs/chat-error-dialog/chat-error-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];
  chatFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.messages.push(new ChatMessage('동길', '안녕!'));
    this.messages.push(new ChatMessage('철수', '할루!'));
    this.chatFormGroup = this.formBuilder.group({
      writer: new FormControl('', [Validators.required]),
      contents: new FormControl('', [Validators.required])
    });
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
