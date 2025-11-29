import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Shared: Loading Spinner Component
 * 
 * A simple loading spinner component for indicating async operations.
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() message = 'Loading...';
}

