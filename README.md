### If you want to checkout a live demo, I've integrated this project with my other Game of Life experiments [here](https://github.com/PriyavKaneria/experiments-with-game-of-life) [WIP]


Steps to build and run the project:

### 1. **Install Rust (if not already installed)**:
   If you haven't installed Rust, you can do so by running the following command in your terminal: (for Linux and macOS)
   ```sh
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```
   After installation, add Rust to your system's PATH by running:
   ```sh
   source $HOME/.cargo/env
   ```

### 2. **Install wasm-pack**:
   Once Rust is set up, you can install `wasm-pack` using `cargo` (the Rust package manager). Run:
   ```sh
   cargo install wasm-pack
   ```


### 3. **Install Required Tools**
   Ensure you have the Rust toolchain and `wasm-pack` installed.

   ```sh
   rustup target add wasm32-unknown-unknown
   cargo install wasm-pack
   ```

### 5. **Build the Project with wasm-pack**
   Use `wasm-pack` to build your project and generate the necessary WebAssembly and JavaScript bindings:

   ```sh
   wasm-pack build --target web
   ```

   This command compiles your Rust code into WebAssembly and generates a `pkg` directory containing the `.wasm` file along with JavaScript bindings and TypeScript definitions. The `--target web` flag tells `wasm-pack` to generate the bindings for use in a web environment.


### 7. **Serve Your Project**
   The necessary [index.html](index.html) and [index.js](index.js) files are there in this repo to serve the WebAssembly module.
   You can use a simple HTTP server to serve the files. For instance, if you have `npm` installed, you can use `http-server`:

   ```sh
   npx http-server .
   ```

   Navigate to the provided local server address in your browser to see the result.