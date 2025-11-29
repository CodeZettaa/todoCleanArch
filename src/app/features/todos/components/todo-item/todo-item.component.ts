import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../../../domain';
import { ButtonComponent } from '../../../../shared';

/**
 * Feature: Todo Item Component (Presentational)
 * 
 * This is a presentational component that displays a single todo item.
 * It receives data via @Input and emits events via @Output.
 */
@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() onToggle = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();
}

