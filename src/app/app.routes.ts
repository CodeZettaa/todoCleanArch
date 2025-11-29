import { Routes } from '@angular/router';

/**
 * Application Routes
 * 
 * Defines the routing configuration for the application.
 * Uses lazy loading for feature modules.
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./features/todos/pages/todos.page').then(m => m.TodosPageComponent)
  },
  {
    path: '**',
    redirectTo: '/todos'
  }
];

