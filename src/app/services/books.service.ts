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

  searchBooks(query: string, startIndex: number = 0): Observable<any> {
    if (!query) {
      return new Observable(observer => observer.next({ totalItems: 0, items: [] }));
    }

    const params = new HttpParams()
      .set('q', query)
      .set('startIndex', startIndex.toString())
      .set('maxResults', this.MAX_RESULTS.toString());

    return this.http.get<any>(this.API_URL, { params });
  }

  getMaxResults(): number {
    return this.MAX_RESULTS;
  }
}
