import { Injectable } from '@angular/core';
import { AddComponent } from './add/add.component';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private refreshSubject = new BehaviorSubject<boolean>(true);

  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next(true);
  }
}
