import React from 'react';
import { Link } from 'react-router';
import { FaSearch, FaHome, FaTools } from 'react-icons/fa';

const Error404 = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="text-center max-w-lg mx-auto">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                            <FaTools className="text-5xl text-gray-400" />
                        </div>
                        <div className="absolute -top-2 -right-2">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <FaSearch className="text-xl text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Service Not Available
                </h1>

                {/* Message */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <p className="text-gray-600 mb-4">
                        The service you're looking for is currently unavailable or has been removed.
                    </p>
                    <p className="text-gray-500 text-sm">
                        This could be due to:
                    </p>
                    <ul className="text-left text-gray-500 text-sm mt-3 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-gray-300 rounded-full mt-2"></span>
                            The service provider is currently not taking bookings
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-gray-300 rounded-full mt-2"></span>
                            The service has been temporarily suspended
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-gray-300 rounded-full mt-2"></span>
                            The service page has been moved or deleted
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/services"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaSearch />
                        Browse Other Services
                    </Link>
                    
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <FaHome />
                        Go to Homepage
                    </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                        Need assistance?{' '}
                        <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                            Contact our support team
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Error404;

