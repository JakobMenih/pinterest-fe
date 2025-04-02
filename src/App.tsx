// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AuthRoute from './components/AuthRoute';

// Additional pages
import PinsPage from './pages/PinsPage';
import PinEditPage from './pages/PinEditPage';
import CreatePinPage from './pages/CreatePinPage';
import CreateUploadPage from './pages/CreateUploadPage';
import UploadsPage from './pages/UploadsPage';
import UploadEditPage from './pages/UploadEditPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/pins" element={<PinsPage />} />
                        <Route path="/pins/create" element={<AuthRoute><CreatePinPage /></AuthRoute>} />
                        <Route path="/pins/:id/edit" element={<AuthRoute><PinEditPage /></AuthRoute>} />
                        <Route path="/upload" element={<AuthRoute><UploadPage /></AuthRoute>} />
                        <Route path="/uploads" element={<UploadsPage />} />
                        <Route path="/uploads/create" element={<AuthRoute><CreateUploadPage /></AuthRoute>} />
                        <Route path="/uploads/:id/edit" element={<AuthRoute><UploadEditPage /></AuthRoute>} />
                        <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
