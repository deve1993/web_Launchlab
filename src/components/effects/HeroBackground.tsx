"use client"
import { useEffect, useRef } from "react"

type Grid = { alive: boolean; opacity: number }[][]

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const cellSize = 5
    const cols = Math.floor(canvas.width / cellSize)
    const rows = Math.floor(canvas.height / cellSize)
    const transitionSpeed = 0.15

    let grid: Grid = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            alive: Math.random() > 0.78,
            opacity: Math.random() > 0.78 ? 0.8 : 0,
          })),
      )

    const countNeighbors = (grid: Grid, x: number, y: number): number => {
      let sum = 0
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const row = (x + i + rows) % rows
          const col = (y + j + cols) % cols
          sum += grid[row][col].alive ? 1 : 0
        }
      }
      sum -= grid[x][y].alive ? 1 : 0
      return sum
    }

    const draw = () => {
      ctx.fillStyle = "#F9FAFB"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j]
          if (cell.alive && cell.opacity < 1) {
            cell.opacity = Math.min(cell.opacity + transitionSpeed, 0.85)
          } else if (!cell.alive && cell.opacity > 0) {
            cell.opacity = Math.max(cell.opacity - transitionSpeed * 0.6, 0)
          }

          if (cell.opacity > 0) {
            // 50/50 mix: orange for some dots, gray for others
            const isOrange = (i + j) % 2 === 0;
            if (isOrange) {
              ctx.fillStyle = `rgba(249, 115, 22, ${cell.opacity * 0.55})`
            } else {
              ctx.fillStyle = `rgba(0, 0, 0, ${cell.opacity * 0.9})`
            }
            ctx.beginPath()
            ctx.arc(
              j * cellSize + cellSize / 2,
              i * cellSize + cellSize / 2,
              1.5,
              0,
              Math.PI * 2,
            )
            ctx.fill()
          }
        }
      }

      const next = grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(grid, i, j)
          const willBeAlive = cell.alive
            ? neighbors >= 2 && neighbors <= 3
            : neighbors === 3
          return { alive: willBeAlive, opacity: cell.opacity }
        }),
      )

      grid = next
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(draw)
      }, 90)
    }

    draw()

    return () => { cancelAnimationFrame(animationFrameId) }
  }, [])

  return (
    <div className="mask pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} width={1500} height={600} />
    </div>
  )
}
