import React, { useCallback, useState } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FileUpload = ({ 
  onFileSelect, 
  acceptedTypes = '.pdf,.doc,.docx', 
  maxSize = 5 * 1024 * 1024, // 5MB
  label = 'Upload File',
  required = false,
  error = null
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file) => {
    // Validate file size
    if (file.size > maxSize) {
      alert(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const acceptedExtensions = acceptedTypes.split(',').map(type => type.trim().toLowerCase());
    
    if (!acceptedExtensions.includes(fileExtension)) {
      alert(`Please select a file with one of these extensions: ${acceptedTypes}`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="file-upload-container">
      <label className="form-field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      <div
        className={`file-upload ${
          dragActive
            ? 'drag-over'
            : error
            ? 'file-upload-error'
            : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleInputChange}
          className="file-upload-input"
        />
        
        {selectedFile ? (
          <div className="file-item">
            <div className="file-item-info">
              <DocumentIcon className="file-item-icon" />
              <div>
                <p className="file-item-name">{selectedFile.name}</p>
                <p className="file-item-size">
                  {Math.round(selectedFile.size / 1024)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="file-item-remove"
            >
              <XMarkIcon className="file-item-icon" />
            </button>
          </div>
        ) : (
          <div className="file-upload-text-container">
            <CloudArrowUpIcon className="file-upload-icon" style={{ width: '2rem', height: '2rem' }} />
            <div className="file-upload-text">
              <span className="file-upload-link">
                Click to upload
              </span>
              <span> or drag and drop</span>
            </div>
            <p className="file-upload-hint">
              {acceptedTypes.replace(/\./g, '').toUpperCase()} up to {Math.round(maxSize / (1024 * 1024))}MB
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="form-field-error">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;