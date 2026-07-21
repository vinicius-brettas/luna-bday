/**
 * Jardín Encantado de Luna - Main JavaScript
 * Un regalo interactivo y mágico para el cumpleaños de Luna
 * 
 * Funcionalidades:
 * - Animaciones de partículas y canvas
 * - Sistema de rosas interactivas con animaciones 3D
 * - Gestión de audio con fade in/out (up.mp3)
 * - Navegación entre pantallas
 * - Efectos visuales mágicos mejorados
 */

// ============================================================================
// CONFIGURACIÓN GLOBAL
// ============================================================================

const CONFIG = {
    MUSIC_FADE_IN_DURATION: 5000,
    MUSIC_INITIAL_VOLUME: 0.3,
    MUSIC_LETTER_VOLUME: 0.15,
    MUSIC_FADE_OUT_DURATION: 3000,
    TYPING_SPEED: 45,
    ROSE_POSITIONS: [
        { x: '15%', y: '20%' }, { x: '50%', y: '10%' }, { x: '85%', y: '25%' },
        { x: '10%', y: '55%' }, { x: '90%', y: '60%' }, { x: '30%', y: '75%' },
        { x: '70%', y: '80%' }, { x: '50%', y: '50%' }, { x: '75%', y: '40%' },
        { x: '25%', y: '85%' }
    ]
};

// ============================================================================
// ALMACENAMIENTO DE ROSAS Y MENSAJES
// ============================================================================

const ROSES_DATA = [
    "Bienvenida al Jardín Encantado.\n\nHoy todas las rosas florecieron para celebrar tu cumpleaños especial.",
    "Eres la luz que ilumina mi mundo.",
    "Tu sonrisa es el regalo más hermoso del universo.",
    "Cada día contigo es una bendición.",
    "Gracias por ser exactamente como eres.",
    "Tu amor transforma mi vida.",
    "Eres mi razón favorita para sonreír.\n\nMi sueño hecho realidad.",
    "Lo mejor está a punto de llegar...\n\nTiene tu nombre.",
    "alert", // Rosa 9 - Alerta Mágica
    "letter" // Rosa 10 - Carta
];

const LETTER_TEXT = `Hoy celebramos a la persona más especial del universo.

A ti, Luna.

Deseo que nunca se apague la magia que llevas dentro.

Que cada nuevo día te traiga razones para sonreír.

Que cada sueño encuentre su camino hacia ti.

Que la vida siempre te sorprenda con momentos tan hermosos como lo eres tú.

Preparé este pequeño jardín porque quería regalarte algo diferente.

Algo hecho con tiempo.

Con dedicación.

Con amor infinito.

Espero que este pequeño detalle haya logrado tocarte el corazón.

Tú eres mi mayor bendición.

❤️

¡Feliz cumpleaños, mi amor!`;

// ============================================================================
// GESTIÓN DE ESTADO
// ============================================================================

const STATE = {
    currentScreen: 'initial',
    musicStarted: false,
    musicPlaying: true,
    currentRoseOpen: null,
    letterOpened: false,
    alertShown: false,
    canvasAnimations: {
        garden: null,
        letter: null,
        final: null
    }
};

// ============================================================================
// UTILIDADES DE AUDIO
// ============================================================================

class AudioManager {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.audio.volume = 0;
    }

    /**
     * Inicia la reproducción de música con fade in
     */
    playWithFadeIn() {
        if (STATE.musicStarted) return;
        
        this.audio.play().catch(() => {
            console.log('Reproducción de audio bloqueada por el navegador');
        });
        STATE.musicStarted = true;
        STATE.musicPlaying = true;
        this.updateMusicButton();
        this.fadeIn(CONFIG.MUSIC_INITIAL_VOLUME, CONFIG.MUSIC_FADE_IN_DURATION);
    }

    /**
     * Alterna pausa/reproducción
     */
    toggleMusic() {
        if (this.audio.paused) {
            this.audio.play();
            STATE.musicPlaying = true;
        } else {
            this.audio.pause();
            STATE.musicPlaying = false;
        }
        this.updateMusicButton();
    }

    /**
     * Actualiza el icono del botón de música
     */
    updateMusicButton() {
        const btn = document.getElementById('musicToggle');
        if (btn) {
            btn.innerHTML = `<span class="music-icon">${STATE.musicPlaying ? '🔊' : '🔇'}</span>`;
        }
    }

    /**
     * Aplica fade in al volumen
     */
    fadeIn(targetVolume, duration) {
        const steps = 60;
        const stepDuration = duration / steps;
        const volumeIncrement = targetVolume / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            if (currentStep < steps) {
                this.audio.volume = Math.min(
                    this.audio.volume + volumeIncrement,
                    targetVolume
                );
                currentStep++;
            } else {
                this.audio.volume = targetVolume;
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }

    /**
     * Aplica fade out al volumen
     */
    fadeOut(duration) {
        const steps = 60;
        const stepDuration = duration / steps;
        const volumeDecrement = this.audio.volume / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            if (currentStep < steps) {
                this.audio.volume = Math.max(
                    this.audio.volume - volumeDecrement,
                    0
                );
                currentStep++;
            } else {
                this.audio.volume = 0;
                this.audio.pause();
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }

    /**
     * Establece el volumen a un valor específico
     */
    setVolume(volume) {
        this.audio.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Reduce el volumen a un valor específico
     */
    reduceTo(targetVolume, duration = 1000) {
        const steps = 30;
        const stepDuration = duration / steps;
        const volumeDifference = this.audio.volume - targetVolume;
        const volumeDecrement = volumeDifference / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            if (currentStep < steps) {
                this.audio.volume = Math.max(
                    this.audio.volume - volumeDecrement,
                    targetVolume
                );
                currentStep++;
            } else {
                this.audio.volume = targetVolume;
                clearInterval(fadeInterval);
            }
        }, stepDuration);
    }
}

// ============================================================================
// GESTIÓN DE PANTALLAS
// ============================================================================

class ScreenManager {
    /**
     * Cambia a una pantalla específica
     */
    static switchTo(screenName) {
        // Remover la clase active de todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('screen-active');
        });

        // Agregar la clase active a la pantalla especificada
        const targetScreen = document.getElementById(`${screenName}Screen`);
        if (targetScreen) {
            targetScreen.classList.add('screen-active');
            STATE.currentScreen = screenName;

            // Iniciar animaciones específicas de cada pantalla
            setTimeout(() => {
                if (screenName === 'garden') {
                    startGardenAnimations();
                } else if (screenName === 'letter') {
                    startLetterAnimations();
                } else if (screenName === 'final') {
                    startFinalAnimations();
                }
            }, 100);
        }
    }
}

// ============================================================================
// ANIMACIONES CON CANVAS
// ============================================================================

class CanvasAnimations {
    /**
     * Inicia animaciones del jardín (estrellas, luciérnaga, pétalos)
     */
    static initGarden() {
        const canvas = document.getElementById('gardenCanvas');
        const ctx = canvas.getContext('2d');

        // Hacer canvas responsive
        this.resizeCanvas(canvas);
        window.addEventListener('resize', () => this.resizeCanvas(canvas));

        // Inicializar partículas
        const particles = this.createParticles(50);
        const stars = this.createStars(canvas.width, canvas.height, 80);
        const fireflies = this.createFireflies(canvas.width, canvas.height, 20);

        // Loop de animación
        const animate = () => {
            // Limpiar canvas
            ctx.fillStyle = 'rgba(10, 30, 77, 0)';
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar y actualizar estrellas
            stars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            // Dibujar y actualizar luciérnagas
            fireflies.forEach(firefly => {
                firefly.update();
                firefly.draw(ctx);
            });

            // Dibujar y actualizar pétalos
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw(ctx);

                // Reiniciar partículas que caen del borde
                if (particle.y > canvas.height) {
                    particles[index] = this.createParticle(canvas.width);
                }
            });

            // Dibujar luna
            this.drawMoon(ctx, canvas.width, canvas.height);

            // Dibujar efecto de brillo
            this.drawGlowEffect(ctx, canvas.width, canvas.height);

            STATE.canvasAnimations.garden = requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Inicia animaciones de la carta
     */
    static initLetter() {
        const canvas = document.getElementById('letterCanvas');
        const ctx = canvas.getContext('2d');

        this.resizeCanvas(canvas);
        window.addEventListener('resize', () => this.resizeCanvas(canvas));

        const fireflies = this.createFireflies(canvas.width, canvas.height, 25);
        const stars = this.createStars(canvas.width, canvas.height, 50);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar estrellas
            stars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            // Dibujar luciérnagas
            fireflies.forEach(firefly => {
                firefly.update();
                firefly.draw(ctx);
            });

            this.drawGlowEffect(ctx, canvas.width, canvas.height);

            STATE.canvasAnimations.letter = requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Inicia animaciones finales
     */
    static initFinal() {
        const canvas = document.getElementById('finalCanvas');
        const ctx = canvas.getContext('2d');

        this.resizeCanvas(canvas);
        window.addEventListener('resize', () => this.resizeCanvas(canvas));

        const particles = this.createParticles(80);
        const stars = this.createStars(canvas.width, canvas.height, 100);
        const fireflies = this.createFireflies(canvas.width, canvas.height, 30);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Dibujar estrellas
            stars.forEach(star => {
                star.update();
                star.draw(ctx);
            });

            // Dibujar luciérnagas
            fireflies.forEach(firefly => {
                firefly.update();
                firefly.draw(ctx);
            });

            // Dibujar pétalos
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw(ctx);

                if (particle.y > canvas.height) {
                    particles[index] = this.createParticle(canvas.width);
                }
            });

            this.drawMoon(ctx, canvas.width, canvas.height);
            this.drawGlowEffect(ctx, canvas.width, canvas.height);

            STATE.canvasAnimations.final = requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Redimensiona el canvas al tamaño de la ventana
     */
    static resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    /**
     * Crea partículas (pétalos)
     */
    static createParticles(count = 30) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(this.createParticle(window.innerWidth));
        }
        return particles;
    }

    /**
     * Crea una partícula individual
     */
    static createParticle(maxWidth) {
        return {
            x: Math.random() * maxWidth,
            y: Math.random() * window.innerHeight - window.innerHeight,
            size: Math.random() * 4 + 2,
            speedY: Math.random() * 1.5 + 0.5,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.08 - 0.04,
            opacity: Math.random() * 0.6 + 0.3,
            color: Math.random() > 0.5 ? '#dc2626' : '#ec4899',

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
            },

            draw(ctx) {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        };
    }

    /**
     * Crea estrellas parpadeantes
     */
    static createStars(width, height, count = 50) {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height * 0.6,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.6 + 0.3,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                twinkleDirection: Math.random() > 0.5 ? 1 : -1,

                update() {
                    this.opacity += this.twinkleSpeed * this.twinkleDirection;
                    if (this.opacity > 1 || this.opacity < 0.2) {
                        this.twinkleDirection *= -1;
                    }
                },

                draw(ctx) {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            });
        }
        return stars;
    }

    /**
     * Crea luciérnagas volantes
     */
    static createFireflies(width, height, count = 15) {
        const fireflies = [];
        for (let i = 0; i < count; i++) {
            fireflies.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2.5 + 1.5,
                speedX: Math.random() * 1.5 - 0.75,
                speedY: Math.random() * 1.5 - 0.75,
                opacity: Math.random() * 0.6 + 0.3,
                glowSize: Math.random() * 30 + 20,
                glowPulse: Math.random() * 0.08,

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    // Rebotar en bordes
                    if (this.x < 0 || this.x > width) this.speedX *= -1;
                    if (this.y < 0 || this.y > height) this.speedY *= -1;

                    this.opacity += Math.random() * 0.12 - 0.06;
                    this.opacity = Math.max(0.1, Math.min(0.9, this.opacity));
                },

                draw(ctx) {
                    ctx.save();
                    ctx.globalAlpha = this.opacity;

                    // Brillo dorado y rosado
                    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
                    gradient.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
                    gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.4)');
                    gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(this.x - this.glowSize, this.y - this.glowSize, this.glowSize * 2, this.glowSize * 2);

                    // Centro
                    ctx.fillStyle = '#fbbf24';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
            });
        }
        return fireflies;
    }

    /**
     * Dibuja la luna
     */
    static drawMoon(ctx, width, height) {
        const moonX = width * 0.85;
        const moonY = height * 0.15;
        const moonRadius = 100;

        // Brillo de luna
        const gradient = ctx.createRadialGradient(moonX - 25, moonY - 25, 0, moonX, moonY, moonRadius * 1.3);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Luna sólida
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fill();

        // Sombra lunar
        ctx.fillStyle = '#0a1e4d';
        ctx.beginPath();
        ctx.arc(moonX + 20, moonY + 20, moonRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Dibuja efecto de brillo general
     */
    static drawGlowEffect(ctx, width, height) {
        const gradient = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, Math.max(width, height));
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.08)');
        gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.04)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    /**
     * Detiene la animación especificada
     */
    static stopAnimation(type) {
        if (STATE.canvasAnimations[type]) {
            cancelAnimationFrame(STATE.canvasAnimations[type]);
            STATE.canvasAnimations[type] = null;
        }
    }
}

// ============================================================================
// GESTIÓN DE ROSAS
// ============================================================================

class RoseManager {
    /**
     * Crea todas las rosas en el jardín
     */
    static createRoses() {
        const container = document.getElementById('rosesContainer');
        container.innerHTML = '';

        ROSES_DATA.forEach((message, index) => {
            const rose = document.createElement('div');
            rose.className = 'rose';
            rose.style.left = CONFIG.ROSE_POSITIONS[index].x;
            rose.style.top = CONFIG.ROSE_POSITIONS[index].y;
            rose.innerHTML = '<span class="rose-emoji">🌹</span>';
            rose.dataset.index = index;

            rose.addEventListener('click', () => this.openRose(index));

            container.appendChild(rose);
        });
    }

    /**
     * Abre una rosa específica
     */
    static openRose(index) {
        const message = ROSES_DATA[index];

        if (message === 'alert') {
            this.showAlert();
            return;
        }

        if (message === 'letter') {
            this.openLetter();
            return;
        }

        // Cerrar mensaje anterior si existe
        if (STATE.currentRoseOpen !== null && STATE.currentRoseOpen !== index) {
            this.closeRoseMessage();
        }

        STATE.currentRoseOpen = index;

        // Crear contenedor del mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = 'rose-message';
        messageDiv.id = 'currentMessage';

        // Centrar mensaje en pantalla
        const messageText = document.createElement('p');
        messageText.textContent = message;
        messageDiv.appendChild(messageText);

        // Botón de cerrar
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-message';
        closeBtn.innerHTML = '×';
        closeBtn.onclick = () => this.closeRoseMessage();
        messageDiv.appendChild(closeBtn);

        document.body.appendChild(messageDiv);

        // Posicionar en el centro
        setTimeout(() => {
            const rect = messageDiv.getBoundingClientRect();
            messageDiv.style.top = `${(window.innerHeight - rect.height) / 2}px`;
            messageDiv.style.left = `${(window.innerWidth - rect.width) / 2}px`;
        }, 10);
    }

    /**
     * Cierra el mensaje de rosa actual
     */
    static closeRoseMessage() {
        const messageDiv = document.getElementById('currentMessage');
        if (messageDiv) {
            messageDiv.remove();
        }
        STATE.currentRoseOpen = null;
    }

    /**
     * Muestra la alerta mágica
     */
    static showAlert() {
        const alertOverlay = document.getElementById('alertOverlay');
        alertOverlay.classList.remove('hidden');
        STATE.alertShown = true;

        const continueBtn = document.getElementById('continueAlertBtn');
        continueBtn.onclick = () => {
            alertOverlay.classList.add('hidden');
        };
    }

    /**
     * Abre la carta
     */
    static openLetter() {
        ScreenManager.switchTo('letter');
        audioManager.reduceTo(CONFIG.MUSIC_LETTER_VOLUME, 1000);

        // Abrir sobre
        const envelope = document.getElementById('envelope');
        setTimeout(() => {
            envelope.classList.add('open');
        }, 500);

        // Revelar carta
        const letter = document.getElementById('letter');
        setTimeout(() => {
            letter.classList.remove('hidden');
            this.typeLetterText();
        }, 1400);
    }

    /**
     * Efecto de máquina de escribir para la carta
     */
    static typeLetterText() {
        const letterText = document.getElementById('letterText');
        letterText.innerHTML = '';
        
        const paragraphs = LETTER_TEXT.split('\n\n');
        let paragraphIndex = 0;
        let charIndex = 0;

        const type = () => {
            if (paragraphIndex < paragraphs.length) {
                const paragraph = paragraphs[paragraphIndex];

                if (charIndex === 0) {
                    const p = document.createElement('p');
                    p.style.minHeight = '1.8rem';
                    letterText.appendChild(p);
                }

                const lastP = letterText.querySelector('p:last-child');
                lastP.textContent += paragraph[charIndex];
                charIndex++;

                if (charIndex < paragraph.length) {
                    setTimeout(type, CONFIG.TYPING_SPEED);
                } else {
                    paragraphIndex++;
                    charIndex = 0;
                    setTimeout(type, 600);
                }
            } else {
                // Carta terminada
                setTimeout(() => this.finishLetter(), 2000);
            }
        };

        type();
    }

    /**
     * Finaliza la carta y va a pantalla final
     */
    static finishLetter() {
        // Cerrar carta
        const envelope = document.getElementById('envelope');
        envelope.classList.remove('open');

        audioManager.fadeOut(CONFIG.MUSIC_FADE_OUT_DURATION);

        setTimeout(() => {
            ScreenManager.switchTo('final');
            this.showFinalMessage();
        }, 1500);
    }

    /**
     * Muestra el mensaje final
     */
    static showFinalMessage() {
        const finalMessage = document.getElementById('finalMessage');
        finalMessage.innerHTML = '';

        const message1 = document.createElement('p');
        message1.className = 'distance-message';
        message1.innerHTML = 'La distancia es solo un número...<br><br>pero tu amor es infinito.❤️';
        finalMessage.appendChild(message1);

        setTimeout(() => {
            const message2 = document.createElement('p');
            message2.className = 'gratitude';
            message2.innerHTML = 'Gracias por recorrer este pequeño jardín.<br><br>¡Feliz cumpleaños, Luna!<br><br>🌹✨';
            finalMessage.appendChild(message2);

            setTimeout(() => {
                CanvasAnimations.initFinal();
                setTimeout(() => {
                    this.fadeToBlack();
                }, 6000);
            }, 1000);
        }, 2000);
    }

    /**
     * Desvanece a negro
     */
    static fadeToBlack() {
        document.body.style.transition = 'background 3s ease-out';
        document.body.style.background = '#000000';

        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.style.opacity = '0';
        });
    }
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

const audioManager = new AudioManager();

document.addEventListener('DOMContentLoaded', () => {
    // Botón de inicio
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', () => {
        ScreenManager.switchTo('garden');
        audioManager.playWithFadeIn();
        RoseManager.createRoses();
    });

    // Control de música
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', () => {
        audioManager.toggleMusic();
    });

    // Hacer canvas responsive
    window.addEventListener('resize', () => {
        if (STATE.currentScreen === 'garden') {
            CanvasAnimations.resizeCanvas(document.getElementById('gardenCanvas'));
        } else if (STATE.currentScreen === 'letter') {
            CanvasAnimations.resizeCanvas(document.getElementById('letterCanvas'));
        } else if (STATE.currentScreen === 'final') {
            CanvasAnimations.resizeCanvas(document.getElementById('finalCanvas'));
        }
    });

    // Permitir que el usuario inicie con un clic en cualquier parte (para audio)
    document.addEventListener('click', () => {
        if (!STATE.musicStarted && STATE.currentScreen !== 'initial') {
            audioManager.playWithFadeIn();
        }
    }, { once: true });
});

/**
 * Inicia animaciones del jardín
 */
function startGardenAnimations() {
    CanvasAnimations.initGarden();
}

/**
 * Inicia animaciones de la carta
 */
function startLetterAnimations() {
    CanvasAnimations.initLetter();
}

/**
 * Inicia animaciones finales
 */
function startFinalAnimations() {
    CanvasAnimations.initFinal();
}
