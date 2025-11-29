import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../../domain';
import { CreateTodoDto } from '../../../domain';
import { TodosStateService } from '../services/todos-state.service';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { TodoFiltersComponent, TodoFilter } from '../components/todo-filters/todo-filters.component';
import { ButtonComponent, ModalComponent } from '../../../shared';

/**
 * Feature: Todos Page (Container Component)
 * 
 * This is the main container component for the Todos feature.
 * It orchestrates the state management and coordinates between
 * presentational components.
 */
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    TodoListComponent,
    TodoFormComponent,
    TodoFiltersComponent,
    ButtonComponent,
    ModalComponent
  ],
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.css']
})
export class TodosPageComponent implements OnInit {
  readonly stateService = inject(TodosStateService);
  
  @ViewChild('todoForm') todoFormComponent?: TodoFormComponent;
  
  // Local UI state
  readonly showForm = signal(false);
  readonly currentFilter = signal<TodoFilter>('all');

  ngOnInit(): void {
    // Load todos when component initializes
    this.stateService.loadTodos().subscribe();
  }

  onCreateTodo(dto: CreateTodoDto): void {
    this.stateService.createTodo(dto).subscribe({
      next: () => {
        this.onModalClose();
      }
    });
  }

  onModalClose(): void {
    this.showForm.set(false);
    this.todoFormComponent?.resetForm();
  }

  onToggleTodo(id: string): void {
    this.stateService.toggleTodo(id).subscribe();
  }

  onDeleteTodo(id: string): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.stateService.deleteTodo(id).subscribe();
    }
  }

  getEmptyMessage(): string {
    const filter = this.currentFilter();
    switch (filter) {
      case 'active':
        return 'No active todos';
      case 'completed':
        return 'No completed todos';
      default:
        return 'No todos yet. Create one to get started!';
    }
  }
}

