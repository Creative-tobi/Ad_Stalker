import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const exportToPDF = async (elementId) => {
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#F8FAFC",
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`AdPulse-Report.pdf`);
};
