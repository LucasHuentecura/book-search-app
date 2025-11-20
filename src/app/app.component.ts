import { Component } from '@angular/core';
import { BookSearchComponent } from './book-search/book-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
