export function WritingPad() {
  const canvas = document.querySelector('canvas');
  console.log(canvas);
  const form = document.querySelector('.signature-pad-form');
  console.log(form);
  const clearButton = document.querySelector('.clear-button');
  console.log(clearButton);
  const ctx = canvas.getContext('2d');
  console.log(ctx);

  let writingMode = false;
  const handlePointerDown = (event) => {
    writingMode = true;
    ctx.beginPath();
    const [positionX, positionY] = getCursorPosition(event);
    ctx.moveTo(positionX, positionY);
  }
  const handlePointerUp = () => {
    writingMode = false;
  }
  const handlePointerMove = (event) => {
    if (!writingMode) return
    const [positionX, positionY] = getCursorPosition(event);
    ctx.lineTo(positionX, positionY);
    ctx.stroke();
  }
  const getCursorPosition = (event) => {
    let positionX = event.clientX - event.target.getBoundingClientRect().x;
    let positionY = event.clientY - event.target.getBoundingClientRect().y;
    return [positionX, positionY];
  }
  ctx.lineWidth = 3;
  ctx.lineJoin = ctx.lineCap = 'round';
  canvas.addEventListener('pointerdown', handlePointerDown, {passive: true});
  canvas.addEventListener('pointerup', handlePointerUp, {passive: true});
  canvas.addEventListener('pointermove', handlePointerMove, {passive: true});

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // converts the current content of the canvas into a
    // base64-encoded string representation
    const imageURL = canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    // add the element in the DOM
    // const signatureInsertTarget = document.getElementById('foreignObjectWrapper');
    const signatureInsertTarget = document.getElementById('signatureInput');

    // const signatureInsertTarget = document.getElementById('svgContainer');
    // while (signatureInsertTarget.firstChild) {
    //   signatureInsertTarget.removeChild(signatureInsertTarget.firstChild);
    // }
    while (!signatureInsertTarget.querySelector('img')) {
      signatureInsertTarget.appendChild(image);
      clearPad();
    }
    // signatureInsertTarget.appendChild(image);
    // clearPad();
  })
  const clearPad = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearPad();
  })
};
