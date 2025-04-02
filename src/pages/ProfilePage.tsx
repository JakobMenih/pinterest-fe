// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

interface ProfileData {
    id: number;
    email: string;
    username: string;
}

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/users/profile');
                setProfile({
                    id: res.data.id,
                    email: res.data.email,
                    username: res.data.username,
                });
            } catch (err) {
                console.error('Failed to fetch profile:', err);
                alert('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile || !user) return;
        try {
            await api.put(`/users/${profile.id}`, {
                email: profile.email,
                username: profile.username,
            });
            alert('Profile updated!');
        } catch (err) {
            console.error('Failed to update profile:', err);
            alert('Failed to update profile');
        }
    };

    const handleDelete = async () => {
        if (!profile || !user) return;
        if (!window.confirm('Are you sure you want to delete your account?')) return;
        try {
            await api.delete(`/users/${profile.id}`);
            logout();
        } catch (err) {
            console.error('Failed to delete account:', err);
            alert('Failed to delete account');
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (!profile) {
        return <p>No profile data found.</p>;
    }

    return (
        <div className="container mt-5">
            <h1>Your Profile</h1>
            <form onSubmit={handleUpdate} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="profileEmail" className="form-label">Email</label>
                    <input
                        id="profileEmail"
                        type="email"
                        className="form-control"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="profileUsername" className="form-label">Username</label>
                    <input
                        id="profileUsername"
                        type="text"
                        className="form-control"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
                <button type="button" className="btn btn-danger ms-3" onClick={handleDelete}>
                    Delete Account
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
