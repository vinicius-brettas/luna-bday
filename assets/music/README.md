# Background Music

This directory contains the background music for the Enchanted Garden.

## Required File

- **background.mp3** - Background ambient music

### Instructions to add your music:

1. Find or create a soothing, ambient background music file (MP3 format recommended)
2. Rename it to `background.mp3`
3. Place it in this directory (`assets/music/`)
4. The music will automatically play with fade-in effect when the user clicks "Comenzar"

### Audio Configuration

The audio is configured in `script.js` with these parameters:

```javascript
MUSIC_FADE_IN_DURATION: 5000      // 5 seconds fade in
MUSIC_INITIAL_VOLUME: 0.2         // Start at 20% volume
MUSIC_LETTER_VOLUME: 0.1          // Reduce to 10% when letter opens
MUSIC_FADE_OUT_DURATION: 3000     // 3 seconds fade out at the end
```

### Alternative

If you don't have background.mp3, the site will still work perfectly without music. The application handles missing audio gracefully.

---

**Suggested Music Style:**
- Soft, ambient, romantic
- Instrumental preferred
- Duration: 5-10 minutes
- Tempo: Slow to moderate
- Genre: Ambient, Orchestral, Piano, Cinematic
