import React, { useRef, useState } from 'react';
import axios from '../api/axios';
import FilePreview from './FilePreview';

const FileUpload = ({handleUploadSuccess}) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [showOk, setShowOk] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFileSelect = (e) => {
  const selected = e.target.files[0];
  if (!selected) return;

  setFile(selected);
  setFileType(selected.type);
  setShowOk(true);

  const isBlobPreview = selected.type.startsWith('video/') || 
                        selected.type.startsWith('audio/') || 
                        selected.type === 'application/pdf';

  if (isBlobPreview) {
    const objectURL = URL.createObjectURL(selected);
    setPreview(objectURL);
  } else {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selected);
  }

  setShowModal(true);
};



  const handleUpload = async () => {
    if (!file) return alert('No file selected');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('File uploaded successfully');
      setPreview(null);
      setFile(null);
      setFileType(null);
      setShowOk(false);
      setShowModal(false);
      // redirecting to all files
      handleUploadSuccess()
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="upload-inline">
      <button onClick={() => fileInputRef.current.click()}>Upload</button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* Modal for Preview */}
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '600px',
              width: '90%',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <h3>Preview File</h3>
            <FilePreview src={preview} type={fileType} />

            <div style={{ marginTop: '1rem' }}>
              <button onClick={handleUpload}>OK</button>
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
