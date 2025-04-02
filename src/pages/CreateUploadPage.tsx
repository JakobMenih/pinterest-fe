// CreateUploadPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CreateUploadPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            alert("Please provide a title");
            return;
        }
        if (!user) {
            alert("You must be logged in to create an upload");
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        // Only append file if available; otherwise, send empty values
        if (file) {
            formData.append('file', file);
        } else {
            formData.append('file', new Blob([]));
        }
        formData.append('userId', user.id.toString());

        try {
            await api.post('/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Upload created successfully!');
            navigate('/uploads');
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Create Upload</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="uploadTitle" className="form-label">Title</label>
                    <input
                        type="text"
                        id="uploadTitle"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFile" className="form-label">Select File (optional)</label>
                    <input
                        type="file"
                        id="uploadFile"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                {file && <p>Selected File: {file.name}</p>}
                <button type="submit" className="btn btn-primary">Create Upload</button>
            </form>
        </div>
    );
};

export default CreateUploadPage;
