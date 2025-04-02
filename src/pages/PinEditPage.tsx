// PinEditPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PinEditPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPin = async () => {
            try {
                const res = await api.get(`/pins/${id}`);
                const pin = res.data;
                setTitle(pin.title);
                setDescription(pin.description || '');
            } catch (err) {
                console.error('Failed to fetch pin:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPin();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/pins/${id}`, { title, description });
            alert('Pin updated successfully!');
            navigate('/pins');
        } catch (err) {
            console.error('Failed to update pin:', err);
        }
    };

    if (loading) {
        return <p>Loading pin data...</p>;
    }

    return (
        <div className="container">
            <h2>Edit Pin</h2>
            <form onSubmit={handleSubmit}>
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
                        rows={4}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default PinEditPage;
