import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../../domain/entities/todo.model';
import { TodoRepository } from '../../domain/repositories/todo.repository.interface';

/**
 * Infrastructure: Todo API Service (Adapter)
 * 
 * This service implements the TodoRepository interface.
 * It provides the concrete implementation for data operations.
 * 
 * In a real application, this would use HttpClient to call a backend API.
 * For this demo, we use an in-memory store with simulated network delay.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoApiService implements TodoRepository {
  // In-memory store (simulating a database)
  private todos: Todo[] = [
    {
      id: '1',
      title: 'Learn Angular Clean Architecture',
      description: 'Study the principles and patterns of clean architecture in Angular',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'Build a Todo App',
      description: 'Implement a todo application following clean architecture',
      completed: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: '3',
      title: 'Write Documentation',
      description: 'Document the architecture and design decisions',
      completed: false,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    }
  ];

  /**
   * Get all todos
   * Simulates network delay with 300ms delay
   */
  getAll(): Observable<Todo[]> {
    return of([...this.todos]).pipe(delay(300));
  }

  /**
   * Get a todo by ID
   */
  getById(id: string): Observable<Todo | null> {
    const todo = this.todos.find(t => t.id === id) || null;
    return of(todo).pipe(delay(200));
  }

  /**
   * Create a new todo
   */
  create(dto: CreateTodoDto): Observable<Todo> {
    const newTodo: Todo = {
      id: this.generateId(),
      title: dto.title,
      description: dto.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.push(newTodo);
    return of(newTodo).pipe(delay(300));
  }

  /**
   * Update an existing todo
   */
  update(id: string, dto: UpdateTodoDto): Observable<Todo> {
    const index = this.todos.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo: Todo = {
      ...this.todos[index],
      ...dto,
      updatedAt: new Date()
    };

    this.todos[index] = updatedTodo;
    return of(updatedTodo).pipe(delay(300));
  }

  /**
   * Delete a todo
   */
  delete(id: string): Observable<void> {
    const index = this.todos.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    this.todos.splice(index, 1);
    return of(undefined).pipe(delay(200));
  }

  /**
   * Generate a unique ID for new todos
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

