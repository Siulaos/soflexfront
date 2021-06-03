import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChannelOrderService {
  constructor() {}
  private subject = new Subject<boolean>();
  chanelBadge = this.subject.asObservable();

  getOrderCall(callOrder: boolean): void {
    this.subject.next(callOrder);
  }
}
