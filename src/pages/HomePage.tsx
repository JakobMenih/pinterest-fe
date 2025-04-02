// HomePage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PinCard, { Pin } from '../components/PinCard';
import UploadCard, { Upload } from '../components/UploadCard';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const [pins, setPins] = useState<Pin[]>([]);
    const [uploads, setUploads] = useState<Upload[]>([]);
    const [loadingPins, setLoadingPins] = useState(true);
    const [loadingUploads, setLoadingUploads] = useState(true);

    // Fetch pins once when component mounts
    useEffect(() => {
        const fetchPins = async () => {
            try {
                const res = await api.get<Pin[]>('/pins');
                setPins(res.data);
            } catch (err) {
                console.error('Failed to fetch pins:', err);
            } finally {
                setLoadingPins(false);
            }
        };
        fetchPins();
    }, []);

    // Fetch uploads whenever the user changes so that uploads include proper ownership info
    useEffect(() => {
        const fetchUploads = async () => {
            try {
                const res = await api.get<Upload[]>('/uploads');
                setUploads(res.data);
            } catch (err) {
                console.error('Failed to fetch uploads:', err);
            } finally {
                setLoadingUploads(false);
            }
        };
        fetchUploads();
    }, [user]);

    if (loadingPins || loadingUploads) {
        return <p>Loading home content...</p>;
    }

    return (
        <div className="container">
            <div className="mb-5">
                <h2 className="mb-3">Pins</h2>
                {pins.length === 0 ? (
                    <p>No pins available.</p>
                ) : (
                    <div className="row g-4">
                        {pins.map((pin) => (
                            <div key={pin.id} className="col-sm-6 col-md-4 col-lg-3">
                                <PinCard pin={pin} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2 className="mb-3">Uploads</h2>
                {uploads.length === 0 ? (
                    <p>No uploads available.</p>
                ) : (
                    <div className="row g-4">
                        {uploads.map((upload) => (
                            <div key={upload.id} className="col-sm-6 col-md-4 col-lg-3">
                                <UploadCard
                                    upload={upload}
                                    onDelete={(deletedId) =>
                                        setUploads((prev) => prev.filter((u) => u.id !== deletedId))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
