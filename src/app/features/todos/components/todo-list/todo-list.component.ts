import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../../domain';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { LoadingSpinnerComponent } from '../../../../shared';

/**
 * Feature: Todo List Component (Presentational)
 * 
 * A component that displays a list of todos.
 */
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, LoadingSpinnerComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  private readonly todosSignal = signal<Todo[]>([]);
  private readonly filterSignal = signal<'all' | 'active' | 'completed'>('all');

  @Input({ required: true })
  set todos(value: Todo[]) {
    this.todosSignal.set(value);
  }

  @Input()
  set filter(value: 'all' | 'active' | 'completed') {
    this.filterSignal.set(value);
  }

  @Input() loading = false;
  @Input() loadingMessage = 'Loading todos...';
  @Input() emptyMessage = 'No todos found';

  @Output() onToggle = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  filteredTodos = computed(() => {
    const todos = this.todosSignal();
    const filter = this.filterSignal();
    
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  });
}

