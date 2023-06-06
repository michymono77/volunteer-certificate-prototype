import React, { useRef } from 'react';
import './App.css';
import { ReactComponent as MySVG } from'./template.svg';
// import { WritingPad } from './utils/WritingPad.js';
import { pdfDownload } from './utils/pdfDownload';
import WritingPad from './WritingPad';

function App() {
  // WritingPad();
  const printRef = useRef();
  const handleDownloadClick = () => {
    pdfDownload(printRef.current);
  }
  return (
    <div className="App">
      <button
        type="button"
        onClick={handleDownloadClick}
      >
        PDFダウンロード
      </button>
      <div ref={printRef}>
        <MySVG />
        <WritingPad />
      </div>
    </div>
  );
}

export default App;
