// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

type Pin = {
    id: number;
    title: string;
    imageUrl: string;
};

const HomePage: React.FC = () => {
    const [pins, setPins] = useState<Pin[]>([]);

    useEffect(() => {
        api.get('/pins')
            .then((res) => {
                setPins(res.data);
            })
            .catch((err) => {
                console.error('Error fetching pins:', err);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">All Pins</h2>
            {pins.length === 0 ? (
                <p>No pins available. Create some pins!</p>
            ) : (
                <div className="row">
                    {pins.map(pin => (
                        <div key={pin.id} className="col-md-3 mb-4">
                            <div className="card">
                                {pin.imageUrl && (
                                    <img src={pin.imageUrl} className="card-img-top" alt={pin.title} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{pin.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
