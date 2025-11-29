/**
 * Domain Entity: Todo
 * 
 * This is the core business entity representing a Todo item.
 * It contains no framework-specific code and is UI-agnostic.
 */
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO for creating a new Todo
 */
export interface CreateTodoDto {
  title: string;
  description?: string;
}

/**
 * DTO for updating a Todo
 */
export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

