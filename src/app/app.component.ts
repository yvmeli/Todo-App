import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoInputComponent, TodoListComponent, MatToolbarModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>check_circle</mat-icon>
      <span>Todo App</span>
    </mat-toolbar>
    <div class="container">
      <app-todo-input></app-todo-input>
      <app-todo-list></app-todo-list>
    </div>
  `,
  styles: [`
    mat-toolbar {
      margin-bottom: 20px;
    }
    mat-icon {
      margin-right: 10px;
    }
  `]
})
export class AppComponent {
  title = 'Todo App';
}
