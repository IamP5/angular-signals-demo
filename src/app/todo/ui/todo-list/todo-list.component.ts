import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../../@models/todo.model";

@Component({
  standalone: true,
  selector: 'app-todo-list',
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        <div (click)="toggleTodo(todo.id)">
          <input type="checkbox" [checked]="todo.completed" />
          <h2>{{todo.title}}</h2>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos!: Todo[];
  @Output() todoOutput = new EventEmitter<Todo[]>()

  toggleTodo(id: number) {
    this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })

    this.emitEvent()
  }

  emitEvent() {
    this.todoOutput.emit(this.todos)
  }
}