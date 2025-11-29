import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoRepository, TODO_REPOSITORY } from '../repositories/todo.repository.interface';

/**
 * Use Case: Delete Todo
 * 
 * This use case encapsulates the business logic for deleting a todo.
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteTodoUseCase {
  private readonly repository = inject<TodoRepository>(TODO_REPOSITORY);

  /**
   * Execute the use case: delete a todo
   * 
   * @param id - The ID of the todo to delete
   */
  execute(id: string): Observable<void> {
    return this.repository.delete(id);
  }
}

