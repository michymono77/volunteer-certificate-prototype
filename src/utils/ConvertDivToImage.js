import html2canvas from 'html2canvas';

export function convertDivToImage(divElement, container) {
  html2canvas(divElement).then(canvas => {
    // Convert the canvas to a data URL
    const dataUrl = canvas.toDataURL('image/png');

    // Create an image element
    const image = new Image();
    image.src = dataUrl;

    // Append the image element to the document or use it as desired
    container.appendChild(image)
    // document.body.appendChild(image);
  });
}
