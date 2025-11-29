import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TodoFilter = 'all' | 'active' | 'completed';

/**
 * Feature: Todo Filters Component (Presentational)
 * 
 * A component for filtering todos by status.
 */
@Component({
  selector: 'app-todo-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.css']
})
export class TodoFiltersComponent {
  @Input() currentFilter: TodoFilter = 'all';
  @Output() onFilterChange = new EventEmitter<TodoFilter>();

  filters: TodoFilter[] = ['all', 'active', 'completed'];
}

