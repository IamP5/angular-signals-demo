import { Component, inject } from "@angular/core";
import { TodoSignal } from "../../data-acess/todo.signal";
import { CategoryCounterComponent } from "../../ui/category-counter/category-counter.component";
import { TodoListComponent } from "../../ui/todo-list/todo-list.component";

@Component({
  standalone: true,
  selector: 'app-todos',
  imports: [TodoListComponent, CategoryCounterComponent],
  template: `
    <section>
      <input #name type="text" (keyup.enter)="createTodo(name.value); name.value = ''"/>
      <h4>Completed Todos: {{todoSignal.completedTodos()}}</h4>
      <app-category-counter [categories]="todoSignal.categoryCounter()"></app-category-counter>
    </section>
    <app-todo-list 
      [todos]="this.todoSignal.todos()"
      (todoOutput)="todoSignal.todos.set($event)"    
    />
  `,
  styleUrls: ['./todos.component.scss'],
})
export class Todos {
  todoSignal = inject(TodoSignal)

  createTodo(name: string) {
    const newTodo = {
      id: this.todoSignal.todos().length + 1,
      title: name,
      completed: false,
      categoryId: 1
    }

    this.todoSignal.addTodo(newTodo)
  }
}