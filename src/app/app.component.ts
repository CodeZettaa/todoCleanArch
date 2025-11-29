import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

/**
 * Root Application Component
 * 
 * The main app component that serves as the root of the application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Angular Clean Architecture - Todo App';

  constructor(private router: Router) {}

  ngOnInit() {
    // Handle GitHub Pages 404 redirect
    // The 404.html script converts paths to query parameters like ?/todos
    // We need to convert them back to proper routes
    const search = window.location.search;
    if (search && search.includes('?/')) {
      // Extract the path from the query parameter
      // Format: ?/todos or ?/todos&other=params
      const match = search.match(/\?\/([^&]*)/);
      if (match && match[1]) {
        let path = match[1];
        // Replace ~and~ back to & if present
        path = path.replace(/~and~/g, '&');
        // Remove the baseHref prefix if present (e.g., "todoCleanArch/todos" -> "todos")
        const baseHref = '/todoCleanArch/';
        if (path.startsWith('todoCleanArch/')) {
          path = path.substring('todoCleanArch/'.length);
        } else if (path.startsWith('/todoCleanArch/')) {
          path = path.substring('/todoCleanArch/'.length);
        }
        // Ensure path starts with /
        if (!path.startsWith('/')) {
          path = '/' + path;
        }
        // Navigate to the correct route (Angular will add baseHref automatically)
        this.router.navigateByUrl(path, { replaceUrl: true });
      }
    }
  }
}

