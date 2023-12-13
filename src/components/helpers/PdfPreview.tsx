import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfPreview({ file }: { file: File }) {
  const [numPages, setNumPages] = useState(1);
  function onDocumentLoadSuccess(): void {
    setNumPages(1);
  }

  return (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {/* // ^ fixed hw */}
        <Page height={240} width={170} renderTextLayer={false} renderAnnotationLayer={false} pageNumber={numPages} />
      </Document>
    </div>
  );
}
