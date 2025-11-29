import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTodoDto } from '../../../../domain';
import { ButtonComponent, InputComponent } from '../../../../shared';

/**
 * Feature: Todo Form Component (Presentational)
 * 
 * A form component for creating new todos.
 * Emits the todo data when submitted.
 */
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() onSubmitTodo = new EventEmitter<CreateTodoDto>();
  @Output() onCancel = new EventEmitter<void>();

  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const dto: CreateTodoDto = {
        title: this.todoForm.value.title.trim(),
        description: this.todoForm.value.description?.trim() || undefined
      };
      this.onSubmitTodo.emit(dto);
      this.todoForm.reset();
    }
  }

  resetForm(): void {
    this.todoForm.reset();
  }
}

