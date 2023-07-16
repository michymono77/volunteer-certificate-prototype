import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import { pdfDownload } from './utils/pdfDownload';
import { WritingPad } from './utils/WritingPad';
import SVG from './components/SVG';


function App() {
  const printRef = useRef();
  const handleDownloadClick = () => {
    console.log('run!');
    document.getElementById("jsCertificateEditor").classList.add('isHide');
    document.getElementById("jsCertificateDisplay").classList.add('printSetting');

    setIsEditing(false);
    window.print();
    // pdfDownload(printRef.current);
  }
  const [isEditing, setIsEditing] = useState(true);
  const [participantName, setParticipantName] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [activityDate, setActivityDate] = useState('');
  // const [organizationName, setorganizationName] = useState('');
  // const [activityDescription, setActivityDescription] = useState('');
  // const [representativeName, setRepresentativeName] = useState('');

  useEffect(() => {
    setIsEditing(true);
    WritingPad();
  }, []);


    // const openNewTab = () => {
    // const newTab = window.open('', '_blank');
    // newTab.document.write('<html><head><title>My Component</title></head><body><div id="root"></div></body></html>');
    // newTab.document.getElementById('root').innerHTML = '<h1>Hello from new tab!</h1>';

    // const NewComponent = () => (
    //   <div>
    //     <h1>Hello from new tab!</h1>
    //     {/* Your React component goes here */}
    //     <YourComponent />
    //   </div>
    // );
    // ReactDOM.render(<NewComponent />, newTab.document.getElementById('root'));
  // };

  return (
    <div className="App" ref={printRef}>
        <div className="certificateEditor" id="jsCertificateEditor">
          <form className="signature-pad-form" action="#" method="POST">
            <h2>ボランティア証明書編集フォーム</h2>
            <input
              type="text"
              required
              placeholder="Participant Name"
              value={participantName}
              onChange={(event) => setParticipantName(event.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Activity Duration"
              value={activityDuration}
              onChange={(event) => setActivityDuration(event.target.value)}
            />
            <input
              type="date"
              required
              placeholder="Activity Date"
              value={activityDate}
              onChange={(event) => setActivityDate(event.target.value)}
            />
            <canvas height="200" width="600" className="signature-pad"></canvas>
            <p>
              <a href="#" className="clear-button">
                消す
              </a>
            </p>
            <button className="submit-button" type="submit">
              サイン完了
            </button>
          </form>
          <button
            className="submit-button pdf"
            type="button"
            onClick={
              () => {
                handleDownloadClick();
                // openNewTab();
              }
            }
           >
            PDFダウンロード
          </button>
        </div>
      {/* <div className="certificateDisplay" ref={printRef} id="jsCertificateDisplay"> */}
            <div className="certificateDisplay" id="jsCertificateDisplay">

        <div>
          <div className='svgContainer' id='svgContainer'>
            <SVG
              participantName={participantName}
              activityDuration={activityDuration}
              activityDate={activityDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
