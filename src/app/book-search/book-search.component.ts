import { Component, inject, HostListener, signal } from '@angular/core';
import { BooksService } from '../services/books.service';
import { BookItemComponent } from '../book-item/book-item.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [BookItemComponent, FormsModule, CommonModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})
export class BookSearchComponent {
  private bookService = inject(BooksService);

  searchQuery: string = '';

  // Utilizar Signals para el estado
  books = signal<any[]>([]);
  totalItems = signal(0);
  startIndex = 0;

  isLoading = signal(false);
  hasMoreResults = signal(true);

  // Para el manejo de búsqueda con debounce
  private searchTimeout: any;

  onSearchChange(): void {
    clearTimeout(this.searchTimeout);

    // Resetar el estado para nueva búsqueda
    this.books.set([]);
    this.totalItems.set(0);
    this.startIndex = 0;
    this.hasMoreResults.set(true);

    // Limitar llamadas a la API
    this.searchTimeout = setTimeout(() => this.fetchBooks(), 500);
  }

  fetchBooks(): void {
    if (!this.searchQuery || this.isLoading() || !this.hasMoreResults()) {
      return;
    }

    this.isLoading.set(true);
    this.bookService.searchBooks(this.searchQuery, this.startIndex).subscribe({
      next: (response) => {
        const newItems = response.items || [];

        // Actualizar Signals
        this.books.update(currentBooks => [...currentBooks, ...newItems]);
        this.totalItems.set(response.totalItems || 0);
        this.startIndex += this.bookService.getMaxResults();

        // Determinar si quedan más resultados
        this.hasMoreResults.set(this.books.length < this.totalItems());
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.isLoading.set(false);
      }
    });
  }

  // trackBy para *ngFor
  trackByBookId(index: number, book: any): string {
    return book.id;
  }

  // Manejo de scroll para carga infinita
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.isLoading() || !this.hasMoreResults()) {
      return;
    }

    // Cargar cuando el usuario esté a 300 px del final
    const scrollThreshold = 300;
    const isNearBottom = (window.innerHeight + window.scrollY + scrollThreshold) >= document.body.offsetHeight;

    if (isNearBottom) {
      this.fetchBooks();
    }

  }
}
