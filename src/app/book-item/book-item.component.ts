import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  book = input.required<any>();

  private readonly PLACEHOLDER_URL = 'assets/placeholder-boook.png';

  // Usar Signal Computado para determinar la URL inicial
  imageUrl = computed(() => {
    return this.book().volumeInfo?.imageLinks?.smallThumbnail || this.PLACEHOLDER_URL;
  });

  // Manejo de Fallback de Imagen
  onImegeError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement.src.includes(this.PLACEHOLDER_URL)) {
      return; // Evitar bucle infinito si la imagen de marcador de posición también falla
    }
    imgElement.src = this.PLACEHOLDER_URL;
  }
}
