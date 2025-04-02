// UploadsPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import UploadCard, { Upload } from '../components/UploadCard';

const UploadsPage: React.FC = () => {
    const [uploads, setUploads] = useState<Upload[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const res = await api.get<Upload[]>('/uploads');
                setUploads(res.data);
            } catch (err) {
                console.error('Failed to fetch uploads:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUploads();
    }, []);

    const handleDelete = (deletedId: number) => {
        setUploads((prev) => prev.filter((upload) => upload.id !== deletedId));
    };

    if (loading) {
        return <p>Loading uploads...</p>;
    }

    return (
        <div className="container">
            <h2 className="mb-4">Uploads</h2>
            {uploads.length === 0 ? (
                <p>No uploads available.</p>
            ) : (
                <div className="row g-4">
                    {uploads.map((upload) => (
                        <div key={upload.id} className="col-sm-6 col-md-4 col-lg-3">
                            <UploadCard upload={upload} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadsPage;
