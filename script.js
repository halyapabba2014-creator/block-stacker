class StackBlocksGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.highScore = localStorage.getItem('stackBlocksHighScore') || 0;
        this.gameRunning = false;
        this.rainbowMode = false;
        this.soundEnabled = true;
        
        // Game state
        this.blocks = [];
        this.currentBlock = null;
        this.blockSpeed = 2;
        this.blockWidth = 200;
        this.blockHeight = 30;
        this.currentX = 0;
        this.direction = 1;
        this.gameOver = false;
        
        // Animation
        this.animationId = null;
        this.lastTime = 0;
        
        this.init();
    }

    init() {
        this.updateDisplay();
        this.setupEventListeners();
        this.createFirstBlock();
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', () => this.handleClick());
        
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('rainbowBtn').addEventListener('click', () => this.toggleRainbow());
        document.getElementById('soundBtn').addEventListener('click', () => this.toggleSound());
    }

    createFirstBlock() {
        this.blocks = [{
            x: this.canvas.width / 2 - this.blockWidth / 2,
            y: this.canvas.height - this.blockHeight,
            width: this.blockWidth,
            height: this.blockHeight,
            color: this.getRandomColor()
        }];
    }

    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.blocks = [];
        this.blockWidth = 200;
        this.blockSpeed = 2;
        this.createFirstBlock();
        this.createNewBlock();
        this.updateDisplay();
        this.gameLoop();
    }

    createNewBlock() {
        this.currentBlock = {
            x: 0,
            y: this.canvas.height - (this.blocks.length + 1) * this.blockHeight,
            width: this.blockWidth,
            height: this.blockHeight,
            color: this.rainbowMode ? this.getRandomColor() : '#4CAF50'
        };
        this.currentX = 0;
        this.direction = 1;
    }

    handleClick() {
        if (!this.gameRunning || this.gameOver) return;

        this.placeBlock();
    }

    placeBlock() {
        if (!this.currentBlock) return;

        const lastBlock = this.blocks[this.blocks.length - 1];
        const overlap = this.calculateOverlap(this.currentBlock, lastBlock);
        
        if (overlap <= 0) {
            this.endGame();
            return;
        }

        // Play sound
        if (this.soundEnabled) {
            this.playSound();
        }

        // Update current block position and width
        this.currentBlock.x = this.currentX;
        this.currentBlock.width = overlap;
        
        // Add to stack
        this.blocks.push({...this.currentBlock});
        
        // Update next block width
        this.blockWidth = overlap;
        
        // Increase score and speed
        this.score += 10;
        this.blockSpeed = Math.min(this.blockSpeed + 0.1, 8);
        
        // Create next block
        this.createNewBlock();
        this.updateDisplay();
    }

    calculateOverlap(current, last) {
        const currentLeft = current.x;
        const currentRight = current.x + current.width;
        const lastLeft = last.x;
        const lastRight = last.x + last.width;
        
        const overlapLeft = Math.max(currentLeft, lastLeft);
        const overlapRight = Math.min(currentRight, lastRight);
        
        return Math.max(0, overlapRight - overlapLeft);
    }

    update() {
        if (!this.gameRunning || this.gameOver) return;

        // Move current block
        this.currentX += this.blockSpeed * this.direction;
        
        // Bounce off edges
        if (this.currentX <= 0 || this.currentX + this.blockWidth >= this.canvas.width) {
            this.direction *= -1;
            this.currentX = Math.max(0, Math.min(this.currentX, this.canvas.width - this.blockWidth));
        }
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#98FB98');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stacked blocks
        this.blocks.forEach(block => {
            this.drawBlock(block);
        });
        
        // Draw current moving block
        if (this.currentBlock) {
            const currentBlock = {
                ...this.currentBlock,
                x: this.currentX,
                color: this.rainbowMode ? this.getRainbowColor() : this.currentBlock.color
            };
            this.drawBlock(currentBlock, true);
        }
        
        // Draw score
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);
    }

    drawBlock(block, isMoving = false) {
        // Add shadow
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        
        // Draw block
        this.ctx.fillStyle = block.color;
        this.ctx.fillRect(block.x, block.y, block.width, block.height);
        
        // Add highlight for moving blocks
        if (isMoving) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fillRect(block.x, block.y, block.width, 5);
        }
        
        // Reset shadow
        this.ctx.shadowColor = 'transparent';
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        
        // Add border
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(block.x, block.y, block.width, block.height);
    }

    getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getRainbowColor() {
        const time = Date.now() * 0.005;
        const hue = (time * 50) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    }

    playSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    endGame() {
        this.gameRunning = false;
        this.gameOver = true;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('stackBlocksHighScore', this.highScore);
        }
        
        this.updateDisplay();
        this.showGameOver();
        this.animateGameOver();
    }

    animateGameOver() {
        // Simple wobble animation for game over
        let wobble = 0;
        const wobbleInterval = setInterval(() => {
            wobble += 0.3;
            this.blocks.forEach((block, index) => {
                block.x += Math.sin(wobble + index) * 2;
            });
            this.render();
            
            if (wobble > 10) {
                clearInterval(wobbleInterval);
            }
        }, 50);
    }

    showGameOver() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalHighScore').textContent = this.highScore;
        document.getElementById('gameOver').style.display = 'block';
    }

    toggleRainbow() {
        this.rainbowMode = !this.rainbowMode;
        const btn = document.getElementById('rainbowBtn');
        btn.style.background = this.rainbowMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)';
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('soundBtn');
        btn.style.background = this.soundEnabled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)';
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
    }

    gameLoop(currentTime = 0) {
        if (!this.gameRunning) return;
        
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update();
        this.render();
        
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Global functions
function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    game.startGame();
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new StackBlocksGame();
    window.game = game; // Make game globally accessible for restartGame function
});
