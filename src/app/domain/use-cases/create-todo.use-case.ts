import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, CreateTodoDto } from '../entities/todo.model';
import { TodoRepository, TODO_REPOSITORY } from '../repositories/todo.repository.interface';

/**
 * Use Case: Create Todo
 * 
 * This use case encapsulates the business logic for creating a new todo.
 * Business rules (e.g., validation) would go here.
 */
@Injectable({
  providedIn: 'root'
})
export class CreateTodoUseCase {
  private readonly repository = inject<TodoRepository>(TODO_REPOSITORY);

  /**
   * Execute the use case: create a new todo
   * 
   * @param dto - Data transfer object for creating a todo
   */
  execute(dto: CreateTodoDto): Observable<Todo> {
    // Business rule: title is required and must not be empty
    if (!dto.title || dto.title.trim().length === 0) {
      throw new Error('Todo title is required');
    }

    return this.repository.create(dto);
  }
}

