// UploadCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export type Upload = {
    id: number;
    title: string;
    filename: string;
    user: {
        id: number;
        email: string;
        username?: string;
    };
};

interface UploadCardProps {
    upload: Upload;
    onDelete?: (id: number) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({ upload, onDelete }) => {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this upload?')) return;
        try {
            await api.delete(`/uploads/${upload.id}`);
            if (onDelete) onDelete(upload.id);
        } catch (err) {
            console.error('Failed to delete upload:', err);
            alert('Failed to delete upload');
        }
    };

    const isOwner = user && user.id === upload.user.id;

    return (
        <div className="card h-100 shadow-sm">
            {upload.filename ? (
                <img
                    src={`/uploads/${upload.filename}`}
                    className="card-img-top"
                    alt={upload.title}
                    style={{ objectFit: 'cover', height: '200px' }}
                />
            ) : (
                <div style={{ height: '200px' }} className="d-flex align-items-center justify-content-center bg-secondary text-white">
                    No Image
                </div>
            )}
            <div className="card-body">
                <h5 className="card-title">{upload.title}</h5>
                {isOwner && (
                    <div className="d-flex justify-content-between mt-3">
                        <Link to={`/uploads/${upload.id}/edit`} className="btn btn-sm btn-outline-primary">
                            Edit
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadCard;
