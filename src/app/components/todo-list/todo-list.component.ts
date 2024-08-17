import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatCheckboxModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule],
  template: `
    <mat-list>
      <mat-list-item *ngFor="let todo of todos">
        <mat-checkbox [checked]="todo.completed" (change)="toggleTodo(todo.id)"></mat-checkbox>
        <span *ngIf="!todo.editing" [class.completed]="todo.completed" (dblclick)="startEditing(todo)">{{ todo.text }}</span>
        <input *ngIf="todo.editing" [(ngModel)]="todo.editText" (blur)="finishEditing(todo)" (keyup.enter)="finishEditing(todo)">
        <button mat-icon-button color="warn" (click)="removeTodo(todo.id)">
          <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
      color: #888;
    }
    mat-list-item {
      margin-bottom: 10px;
    }
    span {
      margin: 0 10px;
      flex-grow: 1;
    }
    input {
      flex-grow: 1;
      margin: 0 10px;
      font-size: 16px;
    }
  `]
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }

  startEditing(todo: any) {
    todo.editing = true;
    todo.editText = todo.text;
  }

  finishEditing(todo: any) {
    if (todo.editText.trim()) {
      this.todoService.updateTodo(todo.id, todo.editText.trim());
    }
    todo.editing = false;
  }
}
