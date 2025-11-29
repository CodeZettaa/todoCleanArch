import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../entities/todo.model';
import { TodoRepository, TODO_REPOSITORY } from '../repositories/todo.repository.interface';

/**
 * Use Case: Load Todos
 * 
 * This use case encapsulates the business logic for loading all todos.
 * It depends on the repository interface (abstraction), not the implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class LoadTodosUseCase {
  private readonly repository = inject<TodoRepository>(TODO_REPOSITORY);

  /**
   * Execute the use case: load all todos
   */
  execute(): Observable<Todo[]> {
    return this.repository.getAll();
  }
}

