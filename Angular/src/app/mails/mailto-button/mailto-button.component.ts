import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogChooseMailComponent} from '../dialog-choose-mail';

@Component({
  selector: 'app-mailto-button',
  templateUrl: './mailto-button.component.html',
  styleUrls: ['./mailto-button.component.scss']
})

export class MailToButtonComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogChooseMailComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
