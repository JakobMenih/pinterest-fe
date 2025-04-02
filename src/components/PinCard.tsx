// PinCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export type Pin = {
    id: number;
    title: string;
    description?: string;
    user: {
        id: number;
        email: string;
        username?: string;
    };
};

interface PinCardProps {
    pin: Pin;
    onDelete?: (id: number) => void;
}

const PinCard: React.FC<PinCardProps> = ({ pin, onDelete }) => {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this pin?')) return;
        try {
            await api.delete(`/pins/${pin.id}`);
            if (onDelete) onDelete(pin.id);
        } catch (err: any) {
            console.error('Failed to delete pin:', err.response?.data || err.message);
            alert('Failed to delete pin: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    const isOwner = user && user.id === pin.user.id;

    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{pin.title}</h5>
                {pin.description && <p className="card-text">{pin.description}</p>}
                {isOwner && (
                    <div className="d-flex justify-content-between mt-3">
                        <Link to={`/pins/${pin.id}/edit`} className="btn btn-sm btn-outline-primary">
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

export default PinCard;
