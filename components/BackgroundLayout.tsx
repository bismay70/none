import React from 'react';

const BackgroundLayout = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <div className={`min-h-screen bg-gray-900 text-white overflow-hidden relative font-sans selection:bg-blue-500 selection:text-white ${className}`}>
            {/* Abstract Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-100"></div>

                {/* USER BACKGROUND IMAGE PLACEHOLDER */}
                <img
                    src="/home.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay"
                />
                {/* Glowing Orbs */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse delay-1000"></div>
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default BackgroundLayout;
