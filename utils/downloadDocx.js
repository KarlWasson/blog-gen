function downloadDocx() {
  const doc = new Document();
  const children = [];

  // Assuming 'outline' is a string containing the markdown content
  const lines = outline.split('\n');

  lines.forEach((line) => {
    if (line.startsWith('###### ')) {
      children.push(new Paragraph({
        text: line.substring(7),
        heading: "HeadingLevel.HEADING_6",
      }));
    } else if (line.startsWith('##### ')) {
      children.push(new Paragraph({
        text: line.substring(6),
        heading: "HeadingLevel.HEADING_5",
      }));
    } else if (line.startsWith('#### ')) {
      children.push(new Paragraph({
        text: line.substring(5),
        heading: "HeadingLevel.HEADING_4",
      }));
    } else if (line.startsWith('### ')) {
      children.push(new Paragraph({
        text: line.substring(4),
        heading: "HeadingLevel.HEADING_3",
      }));
    } else if (line.startsWith('## ')) {
      children.push(new Paragraph({
        text: line.substring(3),
        heading: "HeadingLevel.HEADING_2",
      }));
    } else if (line.startsWith('# ')) {
      children.push(new Paragraph({
        text: line.substring(2),
        heading: "HeadingLevel.HEADING_1",
      }));
    } else {
      children.push(new Paragraph(line));
    }
  });

  doc.addSection({ children });

  Packer.toBlob(doc).then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "outline.docx";
    link.click();
    URL.revokeObjectURL(url);
  });
}
