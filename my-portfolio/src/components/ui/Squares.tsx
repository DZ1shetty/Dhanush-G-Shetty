import { useRef, useEffect, useState } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

export default function Squares({
  direction = 'right',
  speed = 1,
  borderColor = 'var(--foreground)',
  squareSize = 40,
  hoverFillColor = 'var(--foreground)',
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      // Use parent container dimensions
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          // For the hover effect, we use mouse coordinates which don't wrap with the grid
          const isHovered = hoveredSquare && 
            hoveredSquare.x === Math.floor(x / squareSize) && 
            hoveredSquare.y === Math.floor(y / squareSize);

          if (isHovered) {
            ctx.fillStyle = hoverFillColor;
            // Use 40% opacity for hovered square
            ctx.globalAlpha = 0.4;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
            ctx.globalAlpha = 1.0;
          }

          ctx.strokeStyle = borderColor;
          ctx.globalAlpha = 0.35; // Make the grid lines more visible
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
          ctx.globalAlpha = 1.0;
        }
      }

      // Update grid offset
      const step = speed;
      switch (direction) {
        case 'right':
          gridOffset.current.x -= step;
          break;
        case 'left':
          gridOffset.current.x += step;
          break;
        case 'up':
          gridOffset.current.y += step;
          break;
        case 'down':
          gridOffset.current.y -= step;
          break;
        case 'diagonal':
          gridOffset.current.x -= step;
          gridOffset.current.y -= step;
          break;
      }
      
      // Keep offsets within square bounds to prevent huge numbers
      if (Math.abs(gridOffset.current.x) > squareSize) {
        gridOffset.current.x %= squareSize;
      }
      if (Math.abs(gridOffset.current.y) > squareSize) {
        gridOffset.current.y %= squareSize;
      }

      // @ts-ignore
      requestRef.current = requestAnimationFrame(drawGrid);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // Calculate the hovered square based on current offset
      const hoveredSquareX = Math.floor((mouseX + (gridOffset.current.x % squareSize)) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + (gridOffset.current.y % squareSize)) / squareSize);

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // @ts-ignore
    requestRef.current = requestAnimationFrame(drawGrid);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      // @ts-ignore
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, hoveredSquare]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block" />;
}
