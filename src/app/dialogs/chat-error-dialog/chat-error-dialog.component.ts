import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-error-dialog',
  templateUrl: './chat-error-dialog.component.html',
  styleUrls: ['./chat-error-dialog.component.css']
})
export class ChatErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}

export interface DialogData {
  errorMessage: string;
}
