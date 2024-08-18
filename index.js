// import { memory } from "./pkg/conwaysgol2d_wasm_bg.wasm";
import init, { Universe } from './pkg/conwaysgol2d_wasm.js';

let universe;
let animationId = null;
let wasm;
const cellSize = 10;

async function initializeWasm() {
    wasm = await init();
    universe = Universe.new(window.innerWidth / cellSize, window.innerHeight / cellSize)
    drawGrid();
}

function drawGrid() {
    const canvas = document.getElementById('game-of-life-canvas');
    const ctx = canvas.getContext('2d');

    canvas.height = universe.height() * cellSize;
    canvas.width = universe.width() * cellSize;

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellsPtr = universe.cells();
    const cells = new Uint8Array(wasm.memory.buffer, cellsPtr, universe.width() * universe.height());

    ctx.fillStyle = 'white';
    for (let row = 0; row < universe.height(); row++) {
        for (let col = 0; col < universe.width(); col++) {
            const idx = row * universe.width() + col;
            if (cells[idx] !== 0) {
                ctx.fillRect(
                    col * cellSize,
                    row * cellSize,
                    cellSize,
                    cellSize
                );
            }
        }
    }

    ctx.stroke();
}

function renderLoop() {
    if (universe.is_playing()) {
        universe.simulate_step();
    }
    drawGrid();
    animationId = requestAnimationFrame(renderLoop);
}

document.getElementById('play-pause').addEventListener('click', () => {
    if (universe.is_playing()) {
        universe.pause();
    } else {
        universe.play();
        if (!animationId) {
            renderLoop();
        }
    }
    updatePlayPauseButton();
});

document.getElementById('step').addEventListener('click', () => {
    universe.simulate_step();
    drawGrid();
});

document.getElementById('clear').addEventListener('click', () => {
    universe.clear();
    drawGrid();
});

document.getElementById('randomize').addEventListener('click', () => {
    universe.randomize();
    drawGrid();
});

const canvas = document.getElementById('game-of-life-canvas');
let isMouseDown = false;
let isPaintingWhilePlay = false;
let brushSize = 1;

canvas.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    isPaintingWhilePlay = universe.is_playing();
    universe.pause();
    paint(event);
});

canvas.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        paint(event);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isMouseDown && isPaintingWhilePlay) {
        universe.play()
    }
    isMouseDown = false;
});

canvas.addEventListener('mouseleave', () => {
    if (isMouseDown && isPaintingWhilePlay) {
        universe.play()
    }
    isMouseDown = false;
});

function paint(event) {
    const boundingRect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / 10), universe.height() - 1);
    const col = Math.min(Math.floor(canvasLeft / 10), universe.width() - 1);

    universe.paint_cell(row, col, brushSize);
    drawGrid();
}

document.getElementById('brush-size').addEventListener('change', (event) => {
    brushSize = parseInt(event.target.value);
});

function updatePlayPauseButton() {
    const playPauseButton = document.getElementById('play-pause');
    playPauseButton.textContent = universe.is_playing() ? 'Pause' : 'Play';
}

initializeWasm();