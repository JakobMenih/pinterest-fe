// PinsPage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PinCard, { Pin } from '../components/PinCard';

const PinsPage: React.FC = () => {
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const res = await api.get<Pin[]>('/pins');
                setPins(res.data);
            } catch (err) {
                console.error('Failed to fetch pins:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPins();
    }, []);

    if (loading) {
        return <p>Loading pins...</p>;
    }

    return (
        <div className="container">
            <h2 className="mb-4">Pins</h2>
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
    );
};

export default PinsPage;
