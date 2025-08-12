import { useCallback, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './constants';
import { setUsers, appendUsers, setLoading, setError, resetFeed } from './feedSlice';

export const usePagination = (endpoint = '/user/feed') => {
    const dispatch = useDispatch();
    const { users, currentPage, hasMore, loading, totalPages, error } = useSelector(
        (store) => store.feed
    );

    // Fetch initial data or refresh
    const fetchInitialData = useCallback(async () => {
        try {
            dispatch(setLoading(true));

            const response = await axios.get(`${BASE_URL}${endpoint}?page=1&limit=50`, {
                withCredentials: true
            });

            const { data, currentPage, totalPages, hasMore } = response.data;

            dispatch(setUsers({
                users: data || [],
                currentPage: currentPage || 1,
                totalPages: totalPages || 1,
                hasMore: hasMore ?? (data && data.length === 50) // Fixed: was 50, should be consistent
            }));

        } catch (err) {
            console.error('Error fetching initial data:', err);
            dispatch(setError(err.response?.data?.message || 'Failed to load users'));
        }
    }, [dispatch, endpoint]);

    // Auto-fetch data on mount or when users array is empty
    useEffect(() => {
        if (users.length === 0 && !loading) {
            fetchInitialData();
        }
    }, [fetchInitialData, users.length, loading]);

    // Load more data (pagination)
    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            dispatch(setLoading(true));

            const nextPage = currentPage + 1;
            const response = await axios.get(
                `${BASE_URL}${endpoint}?page=${nextPage}&limit=50`,
                { withCredentials: true }
            );

            const { data, currentPage: newCurrentPage, totalPages, hasMore: moreAvailable } = response.data;

            if (data && data.length > 0) {
                dispatch(appendUsers({
                    users: data,
                    currentPage: newCurrentPage || nextPage,
                    totalPages: totalPages || 1,
                    hasMore: moreAvailable ?? (data.length === 50) // Fixed: changed from 10 to 50
                }));
            } else {
                dispatch(appendUsers({
                    users: [],
                    currentPage: nextPage,
                    totalPages: totalPages || currentPage,
                    hasMore: false
                }));
            }

        } catch (err) {
            console.error('Error loading more data:', err);
            dispatch(setError(err.response?.data?.message || 'Failed to load more users'));
        }
    }, [dispatch, endpoint, loading, hasMore, currentPage]);

    // Refresh data
    const refresh = useCallback(async () => {
        dispatch(resetFeed());
        await fetchInitialData();
    }, [dispatch, fetchInitialData]);

    return {
        users,
        currentPage,
        totalPages,
        hasMore,
        loading,
        error,
        fetchInitialData,
        loadMore,
        refresh
    };
};