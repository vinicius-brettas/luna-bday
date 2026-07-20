# Images and SVG Assets

This directory contains image assets for the Enchanted Garden project.

## Current Status

The application currently uses **Unicode emojis** for all visual elements instead of SVG files. This keeps the project lightweight and eliminates external dependencies.

## Elements Using Emojis

- 🌹 **Roses** - Main interactive elements
- 🌙 **Moon** - Rendered via Canvas API with custom graphics
- ⭐ **Stars** - Rendered via Canvas API (twinkling effect)
- 🌟 **Fireflies** - Rendered via Canvas API (glowing effect)
- 🍔 **Hamburger** - Alert screen
- 🍟 **French Fries** - Alert screen
- 🏅 **Certificate Badge** - Alert screen

## Canvas-Based Graphics

The following elements are drawn dynamically using the Canvas API:

### Garden Screen
- Starfield with twinkling animation
- Large moon with glow effect
- Fireflies with dynamic movement
- Falling petals with rotation
- Gradient glow effects

### Letter Screen
- Fireflies around envelope
- Subtle glow effects

### Final Screen
- Starfield
- Falling petals
- Moon
- Glow effects

## Future Customization

If you want to add custom SVG graphics, you can:

1. Create `.svg` files in this directory
2. Reference them in the HTML (`index.html`)
3. Position them with CSS

### Example SVG Files Structure

```
images/
├── castle.svg       (Background element)
├── moon.svg         (Alternative to Canvas moon)
├── rose.svg         (Alternative rose design)
├── envelope.svg     (Alternative envelope design)
├── butterfly.svg    (Flying element)
└── stars.svg        (Alternative starfield)
```

## Performance Notes

- Canvas rendering is highly optimized for 60 FPS
- Emoji usage requires no additional HTTP requests
- SVG would add flexibility but slight performance overhead
- Current implementation is proven to work on all browsers

## Responsive Design

All graphics scale automatically with window resize due to:
- Canvas auto-resizing
- CSS percentage-based positioning
- Emoji scaling with font-size

---

**No additional images are required for the application to function perfectly!**
