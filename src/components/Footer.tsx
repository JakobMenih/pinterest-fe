// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-light text-center py-3 mt-4 border-top">
            <div className="container">
                <span className="text-muted">© {new Date().getFullYear()} Pinterest Clone. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
