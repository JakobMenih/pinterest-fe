// src/pages/UploadPage.tsx
import React, { useState } from 'react';
import api from '../api/axios';

const UploadPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) {
            alert("Please provide both a file and a title");
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        try {
            const res = await api.post('/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Upload successful!');
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Select File</label>
                    <input
                        type="file"
                        id="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                {file && <p>Selected File: {file.name}</p>}
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
    );
};

export default UploadPage;
