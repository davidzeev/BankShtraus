import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposits-main',
  templateUrl: './deposits-main.component.html',
  styleUrl: './deposits-main.component.scss'
})
export class DepositsMainComponent {

  public action: number = 0
  constructor() { }

  public clickAction(action: number): void {
    this.action = action;
  }

}
