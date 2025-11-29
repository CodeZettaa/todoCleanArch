import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, UpdateTodoDto } from '../entities/todo.model';
import { TodoRepository, TODO_REPOSITORY } from '../repositories/todo.repository.interface';

/**
 * Use Case: Update Todo
 * 
 * This use case encapsulates the business logic for updating a todo.
 */
@Injectable({
  providedIn: 'root'
})
export class UpdateTodoUseCase {
  private readonly repository = inject<TodoRepository>(TODO_REPOSITORY);

  /**
   * Execute the use case: update a todo
   * 
   * @param id - The ID of the todo to update
   * @param dto - Data transfer object with the fields to update
   */
  execute(id: string, dto: UpdateTodoDto): Observable<Todo> {
    // Business rule: if title is provided, it must not be empty
    if (dto.title !== undefined && dto.title.trim().length === 0) {
      throw new Error('Todo title cannot be empty');
    }

    return this.repository.update(id, dto);
  }
}

