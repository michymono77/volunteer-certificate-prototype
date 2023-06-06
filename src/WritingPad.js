import React, { useEffect, useRef } from 'react';

export default function WritingPad() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let writingMode = false;

    const handlePointerDown = (event) => {
      writingMode = true;
      ctx.beginPath();
      const [positionX, positionY] = getCursorPosition(event);
      ctx.moveTo(positionX, positionY);
    };

    const handlePointerUp = () => {
      writingMode = false;
    };

    const handlePointerMove = (event) => {
      if (!writingMode) return;
      const [positionX, positionY] = getCursorPosition(event);
      ctx.lineTo(positionX, positionY);
      ctx.stroke();
    };

    const getCursorPosition = (event) => {
      let positionX = event.clientX - event.target.getBoundingClientRect().x;
      let positionY = event.clientY - event.target.getBoundingClientRect().y;
      return [positionX, positionY];
    };

    ctx.lineWidth = 3;
    ctx.lineJoin = ctx.lineCap = 'round';

    canvas.addEventListener('pointerdown', handlePointerDown, { passive: true });
    canvas.addEventListener('pointerup', handlePointerUp, { passive: true });
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      // Cleanup event listeners when component unmounts
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const canvas = canvasRef.current;
    const imageURL = canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    event.target.appendChild(image);
    clearPad();
  };

  const clearPad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
      <form className="signature-pad-form" action="#" method="POST" onSubmit={handleSubmit}>
      <canvas height="200" width="600" className="signature-pad" ref={canvasRef}></canvas>
      <p>
        <a href="#" className="clear-button" onClick={clearPad}>
          消す
        </a>
      </p>
      <button className="submit-button" type="submit">
        完了
      </button>
    </form>
  );
}
