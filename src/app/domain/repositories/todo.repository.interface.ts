import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../entities/todo.model';

/**
 * Injection Token for TodoRepository
 * 
 * Angular cannot inject interfaces directly, so we use an injection token.
 */
export const TODO_REPOSITORY = new InjectionToken<TodoRepository>('TodoRepository');

/**
 * Repository Interface (Port)
 * 
 * This interface defines the contract for Todo data operations.
 * The infrastructure layer will implement this interface.
 * This follows the Dependency Inversion Principle - domain depends on abstractions.
 */
export interface TodoRepository {
  /**
   * Get all todos
   */
  getAll(): Observable<Todo[]>;

  /**
   * Get a todo by ID
   */
  getById(id: string): Observable<Todo | null>;

  /**
   * Create a new todo
   */
  create(dto: CreateTodoDto): Observable<Todo>;

  /**
   * Update an existing todo
   */
  update(id: string, dto: UpdateTodoDto): Observable<Todo>;

  /**
   * Delete a todo
   */
  delete(id: string): Observable<void>;
}

