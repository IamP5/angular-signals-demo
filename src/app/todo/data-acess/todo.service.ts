import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { combineLatest, map, Observable, shareReplay } from "rxjs";
import { Category } from "../@models/category.model";
import { Todo } from "../@models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http = inject(HttpClient)
  baseUrl = 'http://localhost:3000'

  baseTodos$ = this.http.get<Todo[]>(`${this.baseUrl}/todo`).pipe(shareReplay(1))
  categories$ = this.http.get<Category[]>(`${this.baseUrl}/category`).pipe(shareReplay(1))

  todos$: Observable<Todo[]> = combineLatest({
    todos: this.baseTodos$,
    categories: this.categories$
  }).pipe(
    map(({ todos, categories }) => {
      return todos.map(todo => {
        return {
          ...todo,
          category: categories.find(category => category.id === todo.categoryId)?.name
        }
      })
    }),
  )
}