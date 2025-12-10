import React from 'react';
import './App.css';
import SignatureCanvas from './SignatureCanvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Signature</h1>
        <p className="App-description">
          Create your hand-drawn digital signature using your finger or stylus
        </p>
      </header>
      <main className="App-main">
        <SignatureCanvas />
      </main>
      <footer className="App-footer">
        <p>
          Draw your signature in the canvas above, then save it as an image.
        </p>
      </footer>
    </div>
  );
}

export default App;
