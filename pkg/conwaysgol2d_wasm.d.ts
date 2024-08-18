/* tslint:disable */
/* eslint-disable */
/**
*/
export class Universe {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @returns {Universe}
*/
  static new(width: number, height: number): Universe;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
/**
*/
  simulate_step(): void;
/**
*/
  play(): void;
/**
*/
  pause(): void;
/**
* @returns {boolean}
*/
  is_playing(): boolean;
/**
* @param {number} row
* @param {number} col
* @param {number} brush_size
*/
  paint_cell(row: number, col: number, brush_size: number): void;
/**
*/
  clear(): void;
/**
*/
  randomize(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_universe_free: (a: number, b: number) => void;
  readonly universe_new: (a: number, b: number) => number;
  readonly universe_width: (a: number) => number;
  readonly universe_height: (a: number) => number;
  readonly universe_cells: (a: number) => number;
  readonly universe_simulate_step: (a: number) => void;
  readonly universe_play: (a: number) => void;
  readonly universe_pause: (a: number) => void;
  readonly universe_is_playing: (a: number) => number;
  readonly universe_paint_cell: (a: number, b: number, c: number, d: number) => void;
  readonly universe_clear: (a: number) => void;
  readonly universe_randomize: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
