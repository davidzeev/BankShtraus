import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private $spinnerStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public startLoading(): void {
    this.$spinnerStatus.next(true);
  }

  public stopLoading(): void {
    this.$spinnerStatus.next(false);
  }

  public get spinnerStatus(): Observable<boolean> {
    return this.$spinnerStatus.asObservable();
  }

  public isLoading(): boolean {
    return this.$spinnerStatus.value;
  }
}
