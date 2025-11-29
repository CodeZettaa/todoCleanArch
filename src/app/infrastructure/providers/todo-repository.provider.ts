import { Provider } from '@angular/core';
import { TodoRepository, TODO_REPOSITORY } from '../../domain/repositories/todo.repository.interface';
import { TodoApiService } from '../repositories/todo-api.service';

/**
 * Provider for TodoRepository
 * 
 * This provider connects the domain's abstraction (TodoRepository interface)
 * with the infrastructure's implementation (TodoApiService).
 * 
 * This is where dependency injection is configured at the application level.
 */
export const TODO_REPOSITORY_PROVIDER: Provider = {
  provide: TODO_REPOSITORY,
  useClass: TodoApiService
};

