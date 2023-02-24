import { Routes } from "@angular/router";

export const todoRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/todos/todos.component').then(m => m.Todos),
  }
]