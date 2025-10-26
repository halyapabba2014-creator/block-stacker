# 🧱 Stack Blocks Game

A fun, addictive timing-based block stacking game built with HTML5 Canvas and vanilla JavaScript.

## 🎮 How to Play

1. Click "Start Game" to begin
2. Click or tap when the moving block aligns with the stack below
3. Try to keep the blocks perfectly aligned - any overhang gets cut off
4. As the tower gets narrower, timing becomes more critical
5. Game ends when you miss completely!

## ✨ Features

- **Smooth animations** - 60fps gameplay with HTML5 Canvas
- **Rainbow Mode** - Dynamic color-changing blocks
- **Sound Effects** - Satisfying audio feedback
- **High Score Tracking** - Persistent score storage
- **Responsive Design** - Works on desktop and mobile
- **Game Over Animation** - Dramatic tower collapse effect

## 🚀 Deployment on Render

This project is configured for easy deployment on Render:

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Stack Blocks game"
   git branch -M main
   git remote add origin https://github.com/yourusername/stack-blocks-game.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with your GitHub account
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `stack-blocks-game` repository
   - Render will auto-detect the configuration from `render.yaml`
   - Click "Create Web Service"

### Option 2: Manual Configuration

If you prefer manual setup:

1. **Service Type:** Web Service
2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. **Plan:** Free
5. **Environment:** Node.js

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or use the start command
npm start
```

The game will be available at `http://localhost:3000`

## 📁 Project Structure

```
├── index.html          # Main game file (HTML, CSS, JS)
├── package.json        # Node.js dependencies and scripts
├── render.yaml         # Render deployment configuration
└── README.md          # This file
```

## 🎯 Game Mechanics

- **Block Movement:** Blocks slide horizontally and bounce off screen edges
- **Stacking Logic:** Perfect alignment keeps full width, misalignment cuts off overhang
- **Progressive Difficulty:** Speed increases with each successful stack
- **Scoring:** 10 points per successful stack
- **Collision Detection:** Precise overlap calculation for accurate gameplay

## 🌈 Customization

The game includes several toggleable features:
- **Rainbow Mode:** Dynamic color cycling for blocks
- **Sound Effects:** Audio feedback for stacking actions
- **High Score Persistence:** Scores saved in browser localStorage

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Technical Details

- **Canvas Rendering:** Smooth 60fps animations
- **Audio:** Web Audio API for sound effects
- **Storage:** localStorage for high score persistence
- **Responsive:** CSS media queries for mobile optimization
- **Performance:** RequestAnimationFrame for optimal rendering

## 📄 License

MIT License - feel free to use this code for your own projects!

---

**Enjoy stacking those blocks! 🧱✨**
