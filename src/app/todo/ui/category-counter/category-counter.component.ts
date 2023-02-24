import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <p *ngFor="let category of categories">
        {{category.name}}: {{category.amount}}
      </p>
    </div>
  `,
  styles: []
})
export class CategoryCounterComponent {
  @Input() categories!: { name: string, amount: number }[];
}