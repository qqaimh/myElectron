import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

export const { ipcRenderer } = window;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myElectron';
  clickFrom = '';
  
  constructor(public cdr: ChangeDetectorRef) {
   
  }

  ngOnInit(): void {
    ipcRenderer.on('clickMessageBack', (event, message) => {
      this.clickFrom = message;
      this.cdr.detectChanges();
    })
  }

  directOpenModal() {
    this.clickFrom = '直接点击'
  }

  indirectOpenModal() {
    ipcRenderer.send("clickMessage", {type:'indirectClick'});
  }

}
