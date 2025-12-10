import React, { useRef, useState, useEffect } from 'react';
import './SignatureCanvas.css';

interface SignatureCanvasProps {
  penColor?: string;
  penWidth?: number;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  penColor = '#000000',
  penWidth = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    // Set canvas size to match display size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        
        // Save existing canvas content
        const imageData = canvas.width > 0 ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
        
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Restore canvas content after resize
        if (imageData) {
          ctx.putImageData(imageData, 0, 0);
        }
        
        // Re-apply canvas styling after resize
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [penColor, penWidth]);

  const getCoordinates = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    // Always get fresh rect to handle scroll position changes
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in event) {
      // Touch event
      if (event.touches.length > 0) {
        return {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top,
        };
      }
    } else {
      // Mouse event
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
    return null;
  };

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();
    const coords = getCoordinates(event);
    if (!coords) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (
    event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();
    if (!isDrawing) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to PNG blob
    canvas.toBlob((blob) => {
      if (!blob) return;

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `signature-${Date.now()}.png`;
      link.href = url;
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="signature-canvas-container">
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="signature-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
        {!hasSignature && (
          <div className="signature-placeholder">
            Sign here with your finger or stylus
          </div>
        )}
      </div>
      <div className="signature-controls">
        <button
          className="btn btn-clear"
          onClick={clearSignature}
          disabled={!hasSignature}
        >
          Clear
        </button>
        <button
          className="btn btn-save"
          onClick={saveSignature}
          disabled={!hasSignature}
        >
          Save Signature
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
