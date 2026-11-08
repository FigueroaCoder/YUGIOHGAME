# Duelo de Monstruos

Juego web estilo Yu-Gi-Oh (8000 LP, rival NPC, modo historia, en línea con Firebase, sobres, ruleta, chat y más).
Separado por archivos; **todas las imágenes están dentro de un solo archivo (`js/imagenes.js`)**, así el proyecto tiene pocos archivos y se puede subir a GitHub de una vez.

## Cómo abrirlo

Necesita un servidor web (no funciona bien abriendo `index.html` con doble clic):

- Local: en esta carpeta ejecuta `python3 -m http.server 8000` y abre http://localhost:8000
- GitHub Pages: sube todo a un repositorio, ve a Settings → Pages y elige la rama `main` y la carpeta `/ (root)`.

## Estructura

```
index.html        Estructura de la página; aquí está el orden en que se cargan estilos y scripts
intro.mp4         Video de inicio (TIENES QUE PONERLO TÚ aquí; no venía incluido)
css/              Estilos
js/               Código, separado por tema
js/imagenes.js    TODAS las imágenes (cartas, sobres, ultra especiales y pantalla de temporada)
music/            musica1.mp3, musica2.mp3, musica3.mp3 (en bucle)
```

`js/imagenes.js` pesa unos 18 MB (el límite de GitHub por archivo subido desde el navegador es 25 MB). Si el video `intro.mp4` pesa más de 100 MB, GitHub no lo acepta en un repositorio normal.

### Archivos de código (JS)

- `js/admin-admin-cards.js` — Administrador: categorías y cartas
- `js/admin-admin-seasons.js` — Administrador: temporadas y rivales
- `js/audio-music.js` — Música: 3 canciones en bucle, volumen bajo en combate y botón de configuración
- `js/chat-chat.js` — Chat y recuadros nuevos del inicio
- `js/collection-collection-packs-trades.js` — Colección, sobres y cambios entre jugadores
- `js/collection-pack-effects.js` — Efectos de sobres, vista previa y subir cartas
- `js/collection-pack-opening.js` — Apertura automática de sobres con monstruo flotante
- `js/collection-progress-hot.js` — Progreso de colección y cartas más buscadas
- `js/core-firebase-config.js` — Configuración de Firebase, constantes, hash y utilidades de datos
- `js/core-utils.js` — Utilidades base y referencias al DOM del tablero
- `js/core-viewport.js` — Ajuste del tablero a la pantalla (escala, giro en vertical, notch de iPhone)
- `js/data-cards.js` — Catálogo base de cartas: [id, nombre, ATK, DEF, ...]
- `js/economy-economy.js` — Economía: práctica, recompensas, nivel, bonus de amigos y subastas
- `js/economy-welcome-gift.js` — Regalo: sobre ultra especial de bienvenida para usuarios existentes
- `js/game-battle.js` — Motor de combate: tablero, robar, invocar, atacar, turnos y rival NPC
- `js/game-categories.js` — Categorías de cartas (niveles, comodines, etc.)
- `js/imagenes.js` — Todas las imágenes del juego en un solo archivo.
- `js/intro-intro-admin.js` — Administrador de la intro
- `js/intro-intro.js` — Intro: video sin sesión y pantalla de temporada con sesión
- `js/modes-trio.js` — Modo trío (3 jugadores) y salas en línea
- `js/online-accounts.js` — Cuentas de usuario: registro, login y sesión
- `js/online-catalog.js` — Catálogo de cartas en la base de datos
- `js/online-friends.js` — Amigos y búsqueda por nombre de usuario
- `js/online-network.js` — Red: presencia, retos entre jugadores y cartas
- `js/online-online-match.js` — Partida en línea entre dos jugadores
- `js/roulette-roulette-view.js` — Ruleta: rueda con luces y sobres reales
- `js/roulette-roulette-wheel.js` — Ruleta mejorada, progreso de colección, cartas más buscadas y chat (estilos)
- `js/roulette-roulette.js` — Ruleta diaria (se reinicia a las 12 de la noche)
- `js/story-progress-map.js` — Modo historia: nivel, progreso, premios y mapa
- `js/story-seasons.js` — Modo historia: temporadas, rivales y datos por defecto
- `js/story-shop.js` — Tienda
- `js/story-story-combat.js` — Modo historia: combate contra rivales simulados
- `js/tutorial-tutorial.js` — Tutorial, bloqueo del modo en línea y aprobación de usuarios
- `js/ui-actions.js` — Acciones de la interfaz (ACT)
- `js/ui-base.js` — Base de la interfaz: contenedor #app, render, toasts y helpers de UI
- `js/ui-board-visibility.js` — El tablero solo se ve durante el combate
- `js/ui-fut-interface.js` — Interfaz estilo FUT: barra superior, inicio, acceso y perfil
- `js/ui-photo-fullscreen-login.js` — Foto de perfil, pantalla completa y login adaptable
- `js/ultra-ultra-data.js` — Cartas ultra especiales: datos
- `js/ultra-ultra-effects.js` — Cartas ultra especiales: tipos, utilidades y efectos
- `js/ultra-welcome-pack.js` — Sobre ultra especial de bienvenida

### Archivos de estilos (CSS)

- `css/base-and-battle.css` — Base, tablero de combate y pantallas generales
- `css/board-hidden-until-combat.css` — y:not(.bt) #vp{visibility:hidden}
- `css/fut-alerts-packs.css` — Avisos y apertura de sobres
- `css/fut-auth.css` — Acceso (login y registro)
- `css/fut-collection.css` — Colección, sobres, cambios y admin
- `css/fut-home.css` — Pantalla de inicio
- `css/fut-online-profile.css` — En línea y perfil
- `css/fut-story.css` — Modo historia
- `css/fut-topbar.css` — Barra superior
- `css/fut-ui.css` — Interfaz estilo FUT: variables y base
- `css/ios-mobile-fixes.css` — l{-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-touch-callout:none}body{position:fixed;inset:0;width:100%;overscroll-behavior:none;touch-action:manipulation;-webkit-tap-highlight-color:transparent}#vp{position:fixed;left:0;top:0;width:100%;height:100%}#app{padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px);box-sizing:border-box}
- `css/pack-flip.css` — Apertura de sobres con volteo real

## Cosas importantes al editar

- **El orden de los `<script>` en `index.html` importa.** Todos comparten las mismas variables globales; `js/imagenes.js` va primero porque los demás usan `IMG` e `IMGX`. Si agregas un archivo nuevo, ponlo en el lugar correcto.
- **Imágenes:** en `js/imagenes.js`, `IMG[idCarta] = [frente, efecto]` son las cartas y `IMGX["carpeta/archivo"]` son sobres, cartas ultra especiales y la imagen de temporada. Cada imagen es un texto `data:image/...;base64,...`.
- **Música:** si cambias las canciones, conserva los nombres o actualiza la lista `TR` en `js/audio-music.js`.
- **Firebase:** la configuración está en `js/core-firebase-config.js`. Las claves de Firebase para web son públicas por diseño, así que la seguridad real depende de las reglas de Firestore en tu consola.
