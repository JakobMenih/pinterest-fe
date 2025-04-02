// UploadEditPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const UploadEditPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchUpload = async () => {
            try {
                const res = await api.get(`/uploads/${id}`);
                setTitle(res.data.title);
            } catch (err) {
                console.error('Failed to fetch upload:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUpload();
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (file) {
            formData.append('file', file);
        }
        try {
            await api.put(`/uploads/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Upload updated successfully!');
            navigate('/uploads');
        } catch (err) {
            console.error('Failed to update upload:', err);
            alert('Failed to update upload');
        }
    };

    if (loading) return <p>Loading upload data...</p>;

    return (
        <div className="container mt-5">
            <h1>Edit Upload</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="uploadTitle" className="form-label">Title</label>
                    <input
                        id="uploadTitle"
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="uploadFile" className="form-label">Select New File (optional)</label>
                    <input
                        id="uploadFile"
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Upload</button>
            </form>
        </div>
    );
};

export default UploadEditPage;
