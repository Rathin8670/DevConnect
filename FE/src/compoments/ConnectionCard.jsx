import React, { useState } from 'react';

export const ConnectionCard = ({
    user,
    onConnect,
    onMessage,
    onViewProfile,
    showActions = true,
    variant = 'default' // 'default', 'compact', 'detailed'
}) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Get user initials for fallback avatar
    const getUserInitials = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
        }
        return user?.firstName?.charAt(0)?.toUpperCase() || "?";
    };

    // Handle image error
    const handleImageError = () => {
        setImageError(true);
    };

    // Truncate text helper
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Get skills array (assuming it's a comma-separated string or array)
    const getSkills = () => {
        if (!user?.skills) return [];
        if (Array.isArray(user.skills)) return user.skills.slice(0, 3);
        return user.skills.split(',').map(skill => skill.trim()).slice(0, 3);
    };

    // Compact variant
    if (variant === 'compact') {
        return (
            <div className="flex items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200">
                {/* Avatar */}
                <div className="flex-shrink-0 mr-4">
                    {!imageError && user?.photoUrl ? (
                        <img
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                            src={user.photoUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600">
                            {getUserInitials()}
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {user.jobTitle || 'Developer'}
                    </p>
                </div>

                {/* Quick Action */}
                {showActions && (
                    <button
                        onClick={() => onConnect?.(user)}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Connect
                    </button>
                )}
            </div>
        );
    }

    // Default and detailed variants
    return (
        <div
            className={`group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${variant === 'detailed' ? 'w-full max-w-md' : 'w-96'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative p-6">

                {/* Header Section */}
                <div className="flex items-start space-x-4 mb-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0 relative">
                        {!imageError && user?.photoUrl ? (
                            <img
                                className="w-16 h-16 rounded-full object-cover border-3 border-white dark:border-gray-700 shadow-md group-hover:scale-105 transition-transform duration-300"
                                src={user.photoUrl}
                                alt={`${user.firstName} ${user.lastName}`}
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg border-3 border-white dark:border-gray-700 shadow-md group-hover:scale-105 transition-transform duration-300">
                                {getUserInitials()}
                            </div>
                        )}

                        {/* Online Status Indicator */}
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>

                    {/* User Info */}
                    <div className="flex-grow min-w-0">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {user.firstName} {user.lastName}
                        </h2>

                        {/* Job Title */}
                        {user.jobTitle && (
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {user.jobTitle}
                            </p>
                        )}

                        {/* Location */}
                        {user.location && (
                            <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                                <span className="mr-1">📍</span>
                                {user.location}
                            </p>
                        )}
                    </div>

                   
                </div>

                {/* About Section */}
                {user.about && (
                    <div className="mb-4">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {variant === 'detailed' ? user.about : truncateText(user.about, 120)}
                        </p>
                    </div>
                )}

                {/* Skills Section */}
                {getSkills().length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {getSkills().map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800"
                                >
                                    {skill}
                                </span>
                            ))}
                            {user.skills && (Array.isArray(user.skills) ? user.skills.length : user.skills.split(',').length) > 3 && (
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                    +{(Array.isArray(user.skills) ? user.skills.length : user.skills.split(',').length) - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
                {/* Action Buttons */}
                {showActions && (
                    <div className={`flex gap-2 ${variant === 'detailed' ? 'flex-col' : 'flex-row'}`}>
                        

                        <button
                            onClick={() => onMessage?.(user)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                        >
                            <span>💬</span>
                            Message
                        </button>

                    </div>
                )}
            </div>

            {/* Hover Effect Overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none" />
            )}
        </div>
    );
};