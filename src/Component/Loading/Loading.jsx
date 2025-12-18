import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                {/* Spinner */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#005461] rounded-full border-t-transparent animate-spin"></div>
                </div>
                
                {/* Loading Text */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Loading...</h2>
                <p className="text-gray-600">Please wait while we load your content</p>
                
                {/* Dots Animation */}
                <div className="flex justify-center gap-2 mt-4">
                    <span className="w-3 h-3 bg-[#005461] rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                    <span className="w-3 h-3 bg-[#005461] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-3 h-3 bg-[#005461] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                </div>
            </div>
        </div>
    );
};

export default Loading;