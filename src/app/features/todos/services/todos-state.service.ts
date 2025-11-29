import { Injectable, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../../../domain';
import {
  LoadTodosUseCase,
  CreateTodoUseCase,
  ToggleTodoUseCase,
  UpdateTodoUseCase,
  DeleteTodoUseCase
} from '../../../domain';
import { ErrorHandler } from '../../../core';

/**
 * Feature: Todos State Service
 * 
 * This service manages the state for the Todos feature.
 * It uses Angular Signals for reactive state management.
 * 
 * This is a container/stateful service that orchestrates use cases
 * and maintains local state for the UI.
 */
@Injectable({
  providedIn: 'root'
})
export class TodosStateService {
  constructor(
    private readonly loadTodosUseCase: LoadTodosUseCase,
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly toggleTodoUseCase: ToggleTodoUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  // State signals
  private readonly todosSignal = signal<Todo[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  // Public readonly signals
  readonly todos = this.todosSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed signals
  readonly activeTodos = computed(() =>
    this.todosSignal().filter(todo => !todo.completed)
  );

  readonly completedTodos = computed(() =>
    this.todosSignal().filter(todo => todo.completed)
  );

  /**
   * Load all todos
   */
  loadTodos(): Observable<Todo[]> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.loadTodosUseCase.execute().pipe(
      tap({
        next: (todos) => {
          this.todosSignal.set(todos);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          const message = ErrorHandler.getErrorMessage(error);
          this.errorSignal.set(message);
          this.loadingSignal.set(false);
          ErrorHandler.logError(error, 'TodosStateService.loadTodos');
        }
      })
    );
  }

  /**
   * Create a new todo
   */
  createTodo(dto: CreateTodoDto): Observable<Todo> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.createTodoUseCase.execute(dto).pipe(
      tap({
        next: (todo) => {
          this.todosSignal.update(todos => [...todos, todo]);
          this.loadingSignal.set(false);
        },
        error: (error) => {
          const message = ErrorHandler.getErrorMessage(error);
          this.errorSignal.set(message);
          this.loadingSignal.set(false);
          ErrorHandler.logError(error, 'TodosStateService.createTodo');
        }
      })
    );
  }

  /**
   * Toggle a todo's completed status
   */
  toggleTodo(id: string): Observable<Todo> {
    this.errorSignal.set(null);

    return this.toggleTodoUseCase.execute(id).pipe(
      tap({
        next: (updatedTodo) => {
          this.todosSignal.update(todos =>
            todos.map(todo => todo.id === id ? updatedTodo : todo)
          );
        },
        error: (error) => {
          const message = ErrorHandler.getErrorMessage(error);
          this.errorSignal.set(message);
          ErrorHandler.logError(error, 'TodosStateService.toggleTodo');
        }
      })
    );
  }

  /**
   * Update a todo
   */
  updateTodo(id: string, dto: UpdateTodoDto): Observable<Todo> {
    this.errorSignal.set(null);

    return this.updateTodoUseCase.execute(id, dto).pipe(
      tap({
        next: (updatedTodo) => {
          this.todosSignal.update(todos =>
            todos.map(todo => todo.id === id ? updatedTodo : todo)
          );
        },
        error: (error) => {
          const message = ErrorHandler.getErrorMessage(error);
          this.errorSignal.set(message);
          ErrorHandler.logError(error, 'TodosStateService.updateTodo');
        }
      })
    );
  }

  /**
   * Delete a todo
   */
  deleteTodo(id: string): Observable<void> {
    this.errorSignal.set(null);

    return this.deleteTodoUseCase.execute(id).pipe(
      tap({
        next: () => {
          this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
        },
        error: (error) => {
          const message = ErrorHandler.getErrorMessage(error);
          this.errorSignal.set(message);
          ErrorHandler.logError(error, 'TodosStateService.deleteTodo');
        }
      })
    );
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.errorSignal.set(null);
  }
}

