import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor() {
    // Cargar todos desde localStorage al iniciar
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.todosSubject.next(this.todos);
    }
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todosSubject.next(this.todos);
  }

  getTodos() {
    return this.todosSubject.asObservable();
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
      text,
      completed: false
    };
    this.todos.push(newTodo);
    this.saveTodos();
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveTodos();
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  updateTodo(id: number, newText: string) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    this.saveTodos();
  }
}
