
import { useEffect, useState } from "react";
import { UserCard } from "./UserCard.jsx";
import { usePagination } from "../utils/usePagination.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Feed = () => {
    const navigate=useNavigate();

    const userData=useSelector((store)=> store.user)
    if(!userData){
        navigate("/login");
    }
    const {
        users,
        hasMore,
        loading,
        error,
        fetchInitialData,
        loadMore,
        refresh
    } = usePagination('/user/feed');

    const [initialLoading, setInitialLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            await fetchInitialData();
            setInitialLoading(false);
        };

        loadInitialData();
    }, [fetchInitialData]);

    // Initial loading screen
    if (initialLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
            </div>
        );
    }

    // Error state
    if (error && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Something went wrong
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                    {error}
                </p>
                <button
                    onClick={refresh}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // No users found
    if (!loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="text-8xl mb-6">👥</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No users found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
                    We couldn't find any users at the moment. Try refreshing or check back later!
                </p>
                <button
                    onClick={refresh}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Refresh
                </button>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">


            {/* Main Card Container */}
            <div className="flex justify-center px-4">
                <div className="relative w-full max-w-md">
                    {/* Current User Card */}
                    <UserCard user={users[0]} />

                </div>
            </div>


        </div>
    )
}