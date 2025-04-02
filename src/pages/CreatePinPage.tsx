// CreatePinPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CreatePinPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to create a pin.');
            return;
        }
        try {
            await api.post('/pins', {
                title,
                description,
                userId: user.id, // Note: no imageUrl is sent
            });
            alert('Pin created successfully!');
            navigate('/pins');
        } catch (err) {
            console.error('Failed to create pin:', err);
            alert('Failed to create pin');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Create a New Pin</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="pinTitle" className="form-label">Title</label>
                    <input
                        id="pinTitle"
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pinDescription" className="form-label">Description</label>
                    <textarea
                        id="pinDescription"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Create Pin</button>
            </form>
        </div>
    );
};

export default CreatePinPage;
