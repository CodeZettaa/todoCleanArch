/**
 * Core: Error Handler Utility
 * 
 * Centralized error handling utilities for the application.
 */

export class ErrorHandler {
  /**
   * Extract a user-friendly error message from an error
   */
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unexpected error occurred';
  }

  /**
   * Log error to console (in production, this would send to error tracking service)
   */
  static logError(error: unknown, context?: string): void {
    const message = this.getErrorMessage(error);
    const logMessage = context ? `[${context}] ${message}` : message;
    console.error(logMessage, error);
  }
}

