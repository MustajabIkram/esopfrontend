import React, { useState } from 'react';
import download from 'downloadjs';
import axios from 'axios';

import './Main.css';

export default function Main() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  function handleTemplate(event) {
    if (
      !event.target.files &&
      event.target.files[0].name.split('.').at(-1) !== 'docx'
    ) {
      setFile(null);
      return;
    }
    setFile(event.target.files[0]);
    if (file && data) setUploaded(1);
  }

  function handleExcel(event) {
    if (
      !event.target.files &&
      event.target.files[0].name.split('.').at(-1) !== 'xlsx'
    ) {
      setData(null);
      return;
    }
    setData(event.target.files[0]);
    setUploaded(file && data);
    if (file && data) setUploaded(1);
  }

  async function handleGenerate() {
    if (
      file.name.split('.').at(-1) === 'docx' &&
      data.name.split('.').at(-1) === 'xlsx'
    ) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', data);
      await axios
        .post('https://simple-backend-ffmw.vercel.app/api/upload', formData)
        .then((res) => {
          fetch('https://simple-backend-ffmw.vercel.app/api/download').then(
            (response) => {
              response.blob().then((blob) => {
                download(blob);
              });
            }
          );
        });
    }
  }
  return (
    <main>
      <div className='template'>
        <h1>Template</h1>
        <h3>STEP 1. Upload Template</h3>
        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/file-uploader-firebase.appspot.com/o/templatePreview.png?alt=media&token=74fba46c-e377-49a5-86e4-2f4224500f2d'
            alt='Template Example'
          />
          <figcaption>Your Template</figcaption>
        </figure>
        <input type='file' name='file' onChange={handleTemplate} />
        <br />
        {file && file?.name.split('.').at(-1) === 'docx' ? (
          ''
        ) : (
          <h4>* docx ext only</h4>
        )}
      </div>
      <div className='data'>
        <h1>Data</h1>
        <h3>STEP 2. Upload Excel Sheet</h3>
        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/file-uploader-firebase.appspot.com/o/excelPreview.png?alt=media&token=e71b7bfd-229f-4e30-80b8-e69278cb94db'
            alt='template example'
          />
          <figcaption>Excel Example</figcaption>
        </figure>
        <input type='file' name='data' onChange={handleExcel} />
        <br />
        {data && data?.name.split('.').at(-1) === 'xlsx' ? (
          ''
        ) : (
          <h4>* xlsx ext only</h4>
        )}
      </div>
      <div className='output'>
        <h1>Output</h1>

        <h3>STEP 3. Get Your PDF</h3>

        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/file-uploader-firebase.appspot.com/o/resultPreview.png?alt=media&token=08a1245e-ad39-42e5-a792-08077fa8164b'
            alt='template example'
          />
          <figcaption>Output Preview</figcaption>
        </figure>
        <button
          type='button'
          onClick={handleGenerate}
          className='btn'
          disabled={uploaded === 0}
        >
          Generate
        </button>
        <br />
        <br />
        {uploaded === 0 ? <h4>* upload docs</h4> : ''}
        {/* 
        <button type='button' onClick={handleDownload}>
          Download Result
        </button> */}
      </div>
    </main>
  );
}
