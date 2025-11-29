import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Todo } from '../entities/todo.model';
import { TodoRepository, TODO_REPOSITORY } from '../repositories/todo.repository.interface';

/**
 * Use Case: Toggle Todo
 * 
 * This use case encapsulates the business logic for toggling a todo's completed status.
 */
@Injectable({
  providedIn: 'root'
})
export class ToggleTodoUseCase {
  private readonly repository = inject<TodoRepository>(TODO_REPOSITORY);

  /**
   * Execute the use case: toggle the completed status of a todo
   * 
   * @param id - The ID of the todo to toggle
   */
  execute(id: string): Observable<Todo> {
    return this.repository.getById(id).pipe(
      switchMap(todo => {
        if (!todo) {
          throw new Error(`Todo with id ${id} not found`);
        }

        return this.repository.update(id, {
          completed: !todo.completed
        });
      })
    );
  }
}

