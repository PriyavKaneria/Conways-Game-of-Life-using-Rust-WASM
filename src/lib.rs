use wasm_bindgen::prelude::*;
use js_sys::Math;

// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Universe {
    width: usize,
    height: usize,
    cells: Vec<u8>,
    is_playing: bool,
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: usize, height: usize) -> Universe {
        let cells = (0..width * height)
            .map(|_| if Math::random() < 0.3 { 1 } else { 0 })
            .collect();

        Universe {
            width,
            height,
            cells,
            is_playing: false,
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn cells(&self) -> *const u8 {
        self.cells.as_ptr()
    }

    pub fn simulate_step(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbors) {
                    (1, x) if x < 2 => 0,
                    (1, 2) | (1, 3) => 1,
                    (1, x) if x > 3 => 0,
                    (0, 3) => 1,
                    (otherwise, _) => otherwise,
                };

                next[idx] = next_cell;
            }
        }

        self.cells = next;
    }

    pub fn play(&mut self) {
        self.is_playing = true;
    }

    pub fn pause(&mut self) {
        self.is_playing = false;
    }

    pub fn is_playing(&self) -> bool {
        self.is_playing
    }

    pub fn paint_cell(&mut self, row: usize, col: usize, brush_size: usize) {
        let half_brush = brush_size / 2;
        for dx in 0..brush_size {
            for dy in 0..brush_size {
                let paint_row = (row + dy).wrapping_sub(half_brush) % self.height;
                let paint_col = (col + dx).wrapping_sub(half_brush) % self.width;
                let idx = self.get_index(paint_row, paint_col);
                self.cells[idx] = 1;
            }
        }
    }

    pub fn clear(&mut self) {
        self.cells = vec![0; self.width * self.height];
    }

    pub fn randomize(&mut self) {
        self.cells = (0..self.width * self.height)
            .map(|_| if Math::random() < 0.3 { 1 } else { 0 })
            .collect();
    }

    fn get_index(&self, row: usize, col: usize) -> usize {
        (row * self.width + col) as usize
    }

    fn live_neighbor_count(&self, row: usize, col: usize) -> u8 {
        let mut count = 0;

        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx];
            }
        }

        count
    }
}