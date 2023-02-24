import { computed, inject, Injectable, OnDestroy, Signal, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "../@models/category.model";
import { Todo } from "../@models/todo.model";
import { TodoService } from "./todo.service";

@Injectable({
  providedIn: 'root'
})
export class TodoSignal implements OnDestroy {
  private todosSubscription = new Subscription();
  private categorySubscription = new Subscription();

  private todoService = inject(TodoService)

  todos = signal<Todo[]>([])
  categories = signal<Category[]>([])

  completedTodos = computed(() => this.todos().filter(todo => todo.completed).length)
  categoryCounter = computed(() => this.categories().map(category => ({
    name: category.name,
    amount: this.todos().filter(todo => todo.categoryId === category.id).length
  })))

  constructor() {
    this.getTodosFromObservable();
    this.getCategoriesFromObservable();
  }

  addTodo(todo: Todo) {
    todo.category = this.categories().find(category => category.id === todo.categoryId)?.name
    this.todos.update(todos => [...todos, todo])
  }

  private getTodosFromObservable() {
    this.todosSubscription = this.todoService.todos$.subscribe(todos => this.todos.set(todos))
  }

  private getCategoriesFromObservable() {
    this.categorySubscription = this.todoService.categories$.subscribe(categories => this.categories.set(categories))
  }

  ngOnDestroy() {
    this.todosSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}