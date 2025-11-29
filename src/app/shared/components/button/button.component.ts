import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

/**
 * Shared: Button Component
 *
 * A reusable button component that can be used throughout the application.
 * This is a presentational component - it receives inputs and emits events.
 */
@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent {
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() disabled = false;
  @Input() variant: "primary" | "secondary" | "danger" = "primary";
  @Input() size: "small" | "medium" | "large" = "medium";

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    const classes = [`btn-${this.variant}`];
    if (this.size !== "medium") {
      classes.push(`btn-${this.size}`);
    }
    return classes.join(" ");
  }
}
