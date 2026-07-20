# 🌹 Jardín Encantado de Leidy 🌹

## 📖 Descripción

Un sitio web interactivo, elegante y emotivo diseñado como un regalo de cumpleaños. Un pequeño jardín encantado con rosas mágicas que guardan mensajes especiales, animaciones visuales hermosas y una carta sorpresa.

**Duración aproximada:** 5-8 minutos de experiencia

## ✨ Características Principales

### 🎪 Pantalla Inicial
- Bienvenida personalizada
- Animación de estrellas parpadeantes
- Botón "Comenzar" elegante

### 🌹 Jardín Interactivo
- 10 rosas clickeables distribuidas en perspectiva
- Cada rosa contiene un mensaje especial
- Efectos hover suave
- Rosa 9: Alerta mágica divertida (diagnóstico de hamburguesa)
- Rosa 10: Abre la carta especial

### ✉️ Carta Especial
- Sobre dorado animado
- Efecto de máquina de escribir para el texto
- Mensajes personalizados
- Animaciones suaves de apertura/cierre

### 🎆 Efectos Visuales
- Cielo estrellado parpadeante
- Luna grande luminosa
- Luciérnagas volantes
- Pétalos cayendo
- Efectos de brillo mágico
- Efecto de desvanecimiento final

### 🎵 Audio
- Música ambiente con fade in/out suave
- Volumen controlado dinámicamente
- Soporte para navegadores con políticas de autoplay

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones fluidas
- **JavaScript ES6+** - Lógica interactiva
- **Canvas API** - Animaciones de partículas
- **Sin frameworks ni librerías externas**

## 📂 Estructura del Proyecto

```
luna-bday/
├── index.html        # Estructura HTML
├── style.css         # Estilos y animaciones
├── script.js         # Lógica y interactividad
├── assets/
│   ├── music/
│   │   └── background.mp3
│   └── images/
│       └── (SVG y recursos futuros)
└── README.md         # Este archivo
```

## 🎨 Paleta de Colores

- **Azul Oscuro:** `#0a1e4d`
- **Azul Claro:** `#1e3a8a`
- **Rojo:** `#dc2626`
- **Dorado:** `#fbbf24`
- **Blanco:** `#ffffff`
- **Verde:** `#10b981`

## 🚀 Cómo Usar

1. **Abrir el archivo**
   ```bash
   # Solo necesitas abrir index.html en tu navegador
   # No requiere servidor web
   open index.html
   ```

2. **Flujo de experiencia**
   - Click en "Comenzar"
   - Explorar las 10 rosas haciendo click en ellas
   - Disfrutar el mensaje especial de cada rosa
   - Abrir la carta desde la rosa 10
   - Ver el mensaje final con animaciones

## 🎯 Mensajes de las Rosas

1. **Rosa 1:** Bienvenida al jardín
2. **Rosa 2:** Sobre los sueños
3. **Rosa 3:** Sobre la sonrisa
4. **Rosa 4:** Deseos para el nuevo año
5. **Rosa 5:** Agradecimiento
6. **Rosa 6:** Impacto en el mundo
7. **Rosa 7:** Deseos especiales (Salud, Paz, Alegría, Amor)
8. **Rosa 8:** Anticipación a la sorpresa
9. **Rosa 9:** Alerta mágica (Diagnóstico de hamburguesas)
10. **Rosa 10:** Sobre la carta especial

## 🔊 Gestión de Audio

```javascript
// Fade in al inicio (5 segundos, 20% volumen)
// Reduce a 10% cuando se abre la carta
// Fade out al final (3 segundos)
```

## 📱 Responsividad

El sitio es completamente responsive y funciona perfectamente en:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari (incluyendo iPhone)
- ✅ Edge
- ✅ Dispositivos móviles

## ⚙️ Configuración

Puedes personalizar estos valores en `script.js`:

```javascript
const CONFIG = {
    MUSIC_FADE_IN_DURATION: 5000,      // Duración fade in (ms)
    MUSIC_INITIAL_VOLUME: 0.2,         // Volumen inicial (0-1)
    MUSIC_LETTER_VOLUME: 0.1,          // Volumen al abrir carta
    MUSIC_FADE_OUT_DURATION: 3000,     // Duración fade out (ms)
    TYPING_SPEED: 50                   // Velocidad escritura (ms)
};
```

## 🎬 Animaciones Incluidas

- Transiciones suaves entre pantallas
- Estrellas parpadeantes
- Luciérnagas con brillo dinámico
- Pétalos cayendo con rotación
- Efecto de máquina de escribir
- Escalado de rosas al hover
- Desvanecimiento y escala de mensajes
- Animación de sobre (apertura/cierre)

## 🌐 Compatibilidad

- **Navegadores:** Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **Dispositivos:** Desktop, Tablet, Móvil
- **Resoluciones:** Soporta cualquier tamaño de pantalla

## 📝 Notas Técnicas

- **Sin dependencias externas:** Todo funciona con HTML5/CSS3/JavaScript puro
- **Modular:** Código organizado en clases y funciones reutilizables
- **Comentado:** Código bien documentado para facilitar mantenimiento
- **Performance:** Optimizado para animaciones suave en 60 FPS
- **Accesibilidad:** Semántica HTML adecuada

## 🎁 Personalización

Para personalizar los mensajes de las rosas, edita el array `ROSES_DATA` en `script.js`:

```javascript
const ROSES_DATA = [
    "Tu mensaje personalizado aquí",
    // ... más mensajes
];
```

Para cambiar la carta final, edita la constante `LETTER_TEXT`:

```javascript
const LETTER_TEXT = `Tu texto personalizado aquí`;
```

## 💡 Tips de Uso

- Abre las rosas en cualquier orden
- La rosa 9 es una sorpresa especial (alerta mágica)
- La rosa 10 abre la carta; es el punto culminante
- Espera a que las animaciones se completen
- El audio se ajusta automáticamente

## 🎵 Música

Se requiere un archivo `assets/music/background.mp3`. Si no lo tienes:
- El sitio seguirá funcionando sin música
- Puedes reemplazar con tu propia canción
- Asegúrate de que sea un archivo MP3

## 📞 Soporte

Si tienes problemas:
1. Asegúrate de que todos los archivos estén en la misma carpeta
2. Verifica la consola del navegador (F12) para mensajes de error
3. Prueba en otro navegador
4. Comprueba que el volumen del navegador no esté muted

## 🎉 ¡Disfrúta!

Este pequeño jardín encantado fue creado con tiempo, dedicación y mucho cariño. Esperamos que disfrutes explorando cada rosa y leyendo los mensajes especiales. 

**¡Feliz cumpleaños, Leidy! 🌹❤️**

---

*Creado con ❤️ para un cumpleaños especial*
