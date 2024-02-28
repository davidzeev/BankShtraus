import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BankShtraus';
  spinnerLoading: boolean = false;
  private spinnerSubscription: Subscription;
  constructor(private spinnerService: SpinnerService) {
    this.spinnerSubscription = this.spinnerService.spinnerStatus.subscribe((status) => {
      setTimeout(() => {
        this.spinnerLoading = status;
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }
}
