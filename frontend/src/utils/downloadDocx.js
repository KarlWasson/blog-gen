import { marked } from "marked";
import { asBlob } from "html-docx-js/dist/html-docx";

export const downloadDocx = (markdownText) => {
  // Convert Markdown to HTML using marked library
  const htmlContent = marked(markdownText);

  // Convert the generated HTML to a DOCX blob
  const docxBlob = asBlob(htmlContent);

  // Trigger download of the .docx file
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(docxBlob);
  a.href = url;
  a.download = "Document.docx";
  a.click();
  window.URL.revokeObjectURL(url);
};

export default downloadDocx;
