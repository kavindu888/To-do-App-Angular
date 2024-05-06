import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { AddComponent } from './add/add.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TaskComponent,AddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do';
}
