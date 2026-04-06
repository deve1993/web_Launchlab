"use client";
import { useEffect, useRef } from "react";

const SYMBOLS = ['{', '}', '()', '=>', '</>', ';', '#', '[]', '::', '&&', '||', '/*', '*/', '++', '!=', '==', '~', '$', '@'];

type Cell = { alive: boolean; opacity: number; symbol: string }
type Grid = Cell[][]

export default function DevSymbolsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let generation = 0;
    const cellSize = 20;
    const transitionSpeed = 0.1;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);

    const randomSymbol = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

    let grid: Grid = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            alive: Math.random() > 0.8,
            opacity: Math.random() > 0.8 ? 0.7 : 0,
            symbol: randomSymbol(),
          })),
      );

    const countNeighbors = (g: Grid, x: number, y: number): number => {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const row = (x + i + rows) % rows;
          const col = (y + j + cols) % cols;
          sum += g[row][col].alive ? 1 : 0;
        }
      }
      sum -= g[x][y].alive ? 1 : 0;
      return sum;
    };

    const draw = () => {
      generation++;

      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "600 11px 'IBM Plex Mono', ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j];
          if (cell.alive && cell.opacity < 1) {
            cell.opacity = Math.min(cell.opacity + transitionSpeed, 0.8);
          } else if (!cell.alive && cell.opacity > 0) {
            cell.opacity = Math.max(cell.opacity - transitionSpeed * 0.4, 0);
          }

          if (cell.opacity > 0.02) {
            const isOrange = (i + j) % 2 === 0;
            if (isOrange) {
              ctx.fillStyle = `rgba(249, 115, 22, ${cell.opacity})`;
            } else {
              ctx.fillStyle = `rgba(156, 163, 175, ${cell.opacity})`;
            }
            ctx.fillText(
              cell.symbol,
              j * cellSize + cellSize / 2,
              i * cellSize + cellSize / 2,
            );
          }
        }
      }

      // Next generation with Game of Life rules
      const next = grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(grid, i, j);
          const willBeAlive = cell.alive
            ? neighbors >= 2 && neighbors <= 3
            : neighbors === 3;
          return {
            alive: willBeAlive,
            opacity: cell.opacity,
            symbol: willBeAlive && !cell.alive ? randomSymbol() : cell.symbol,
          };
        }),
      );

      // Inject random new cells every 15 generations to prevent stagnation
      if (generation % 15 === 0) {
        for (let k = 0; k < Math.floor(cols * rows * 0.03); k++) {
          const ri = Math.floor(Math.random() * rows);
          const rj = Math.floor(Math.random() * cols);
          next[ri][rj].alive = true;
          next[ri][rj].symbol = randomSymbol();
        }
      }

      grid = next;
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(draw);
      }, 120);
    };

    draw();

    const handleResize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, transparent 5%, black 15%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 15%, black 92%, transparent)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
