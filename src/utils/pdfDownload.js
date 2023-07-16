import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function pdfDownload(element){
  const canvas = await html2canvas(element, { scale: 2 });
  const data = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight =
    (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('print.pdf');
}
