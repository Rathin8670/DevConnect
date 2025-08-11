import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUser } from "../utils/feedSlice"
import { useState } from "react"

export const UserCard = ({ user, onAction }) => {
    const { _id, firstName, lastName, photoUrl, skills = [], about, lookingFor, gender, age } = user
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendRequest = async (status) => {
        try {
            setIsLoading(true);
            setError('');
            
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + _id, 
                {}, 
                { withCredentials: true }
            );
            
            // Success feedback
            console.log(`Request sent successfully: ${status}`);
            
            // Call the callback to handle the action in parent component
            if (onAction) {
                onAction(_id);
            } else {
                // Fallback to direct dispatch if no callback provided
                dispatch(removeUser(_id));
            }
            
        } catch (err) {
            console.error('Error sending request:', err);
            setError('Failed to send request. Please try again.');
            
            // Remove error message after 3 seconds
            setTimeout(() => setError(''), 3000);
        } finally {
            setIsLoading(false);
        }
    }

    const renderSkills = () => {
        if (!skills || skills.length === 0) {
            return <span className="text-gray-400 italic">No skills listed</span>;
        }
        
        return skills.map((skill, index) => (
            <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
            >
                {skill}
            </span>
        ));
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
            {/* Header with gradient background */}
            <div className="h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-t-xl"></div>
            
            <div className="relative px-6 pb-6">
                {/* Profile Image - positioned to overlap header */}
                <div className="flex justify-center -mt-12 mb-4">
                    <img 
                        className="w-24 h-24 rounded-full shadow-lg border-4 border-white dark:border-gray-800 object-cover" 
                        src={photoUrl || '/default-avatar.png'} 
                        alt={`${firstName} ${lastName}`}
                        onError={(e) => {
                            e.target.src = '/default-avatar.png';
                        }}
                    />
                </div>

                {/* User Info */}
                <div className="text-center mb-4">
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {firstName} {lastName}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {gender && age ? `${gender}, ${age} years old` : 'Age not specified'}
                    </p>
                </div>

                {/* Skills Section */}
                <div className="mb-4">
                    <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Skills
                    </h6>
                    <div className="flex flex-wrap">
                        {renderSkills()}
                    </div>
                </div>

                {/* About Section */}
                {about && (
                    <div className="mb-4">
                        <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            About
                        </h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {about}
                        </p>
                    </div>
                )}

                {/* Looking For Section */}
                {lookingFor && (
                    <div className="mb-6">
                        <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Looking For
                        </h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {lookingFor}
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 text-sm text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                        {error}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 hover:scale-105'
                        } dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800`}
                        onClick={() => handleSendRequest("interested")}
                        disabled={isLoading}
                    >
                        
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                Interested
                            </>
                        )}
                    </button>
                    
                    <button
                        className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200 ${
                            isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 hover:scale-105'
                        } dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}
                        onClick={() => handleSendRequest("ignored")}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Pass
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}