import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes';
  private readonly MAX_RESULTS = 20; // Tamaño de página

  constructor(private http: HttpClient) { }

  /**
   * Busca libros aceptando filtros de categoría e idioma.
   * @param query - El término de búsqueda.
   * @param startIndex - El índice de inicio para la paginación.
   * @param category - La categoría del libro (ej: 'Fiction').
   * @param language - El código ISO 639-1 del idioma (ej: 'es', 'en').
   * @returns 
   */
  searchBooks(query: string, startIndex: number = 0, category?: string, language?: string): Observable<any> {
    if (!query) {
      return new Observable(observer => observer.next({ totalItems: 0, items: [] }));
    }

    // Consulta 'q' con filtros adicionales si se proporcionan
    let fullQuery = query;
    if (category) {
      fullQuery += ` subject:${category}`;
    }

    // Configuración de parámetros HTTP
    let params = new HttpParams()
      .set('q', fullQuery)
      .set('startIndex', startIndex.toString())
      .set('maxResults', this.MAX_RESULTS.toString());

    if (language) {
      params = params.set('langRestrict', language);
    }

    return this.http.get<any>(this.API_URL, { params });
  }

  getMaxResults(): number {
    return this.MAX_RESULTS;
  }

  // Definir categorías comunes para el componente
  getCategories(): string[] {
    return ['Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery', 'Romance', 'Computers'];
  }

  getLanguages(): { code: string, name: string }[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' }
    ];
  }
}
