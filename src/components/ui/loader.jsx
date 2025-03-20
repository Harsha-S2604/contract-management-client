import React from 'react';

const Loader = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="flex justify-center items-center space-x-2">
                <div className="w-8 h-8 border-4 border-t-transparent border-primary border-solid rounded-full animate-spin"></div>
                <span className="text-gray-500">Loading...</span>
            </div>
        </div>

    );
};

export default Loader;
