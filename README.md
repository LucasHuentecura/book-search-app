# BookSearchApp
>[!NOTE]
>Este proyecto fué generado utilizando [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Descripción del proyecto
Es una aplicación web de búsqueda de libros que utiliza la API pública de Google Books para permitir a los usuarios buscar, filtrar y explotar una vasta colección de títulos con un rendimiento optimizado.

![image alt](https://github.com/LucasHuentecura/book-search-app/blob/c08d517847abe53f8cb97cd4f5d1a9d02bc178ed/Capturas/Captura%201.png)

### Características destacadas
- ***Manejo de estados:*** Proporciona un mecanismos de reactividad más granular y eficiente, mejorando el rendimiento de la detección de cambios.
- ***Carga de listas:*** Evita la re-renderización innecesaria del DOM en listas dinámicas, crucial para la carga infinita.
- ***Carga de datos:*** Reduce drásticamente el tiempo de carga inicial al obtener solo 20 resultados a la vez, implementando @HostListener y gestión del startIndex.
- ***Imágenes con carga diferida:*** Indica al navegador que posponga la carga de imágenes fuera del viewport, mejorando la velocidad percibida.
- ***Búsqueda:*** Implementado con setTimeout para evitar llamadas a la API con cada pulsación de tecla, reduciendo la carga del servidor.

## Tecnologías
- ***Framework:***Angular
- ***Lenguaje:***TypeScript
- ***Estilos y estructura:***CSS/HTML
- ***Servicios Externos:*** Google Books API
