// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import AuthRoute from './components/AuthRoute';

const App: React.FC = () => {
    console.log("App component is rendering");
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container mt-3">
                    <h1 className="text-center">Welcome to Pinterest Clone</h1>
                    <p>This is a debug message to confirm rendering.</p>
                </div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/upload" element={<AuthRoute><UploadPage /></AuthRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
