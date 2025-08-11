import { createSlice } from "@reduxjs/toolkit";

// const feedSlice=createSlice({
//     name:'feed',
//     initialState:null,
//     reducers:{
//         addFeed:(state,action)=>{
//             return action.payload
//         },
//         removeFeed:(state,action)=>{
//             const newFeed=state.filter((user)=> user._id !== action.payload);
//             return newFeed;
//         }
//     }
// // })

// export const {addFeed,removeFeed}=feedSlice.actions;
// export default feedSlice.reducer;

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        users: [],
        currentPage: 1,
        totalPages: 1,
        hasMore: true,
        loading: false,
        error: null,
        pageSize: 10
    },
    reducers: {
        // For initial load or refresh
        setUsers: (state, action) => {
            state.users = action.payload.users || [];
            state.currentPage = action.payload.currentPage || 1;
            state.totalPages = action.payload.totalPages || 1;
            state.hasMore = action.payload.hasMore ?? true;
            state.loading = false;
            state.error = null;
        },

        // For loading more users (append to existing)
        appendUsers: (state, action) => {
            state.users = [...state.users, ...action.payload.users];
            state.currentPage = action.payload.currentPage || state.currentPage + 1;
            state.totalPages = action.payload.totalPages || state.totalPages;
            state.hasMore = action.payload.hasMore ?? (state.currentPage < state.totalPages);
            state.loading = false;
            state.error = null;
        },

        // For loading states
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // For error states
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Reset feed (useful for refresh)
        resetFeed: (state) => {
            state.users = [];
            state.currentPage = 1;
            state.totalPages = 1;
            state.hasMore = true;
            state.loading = false;
            state.error = null;
        },

        // Remove user after action (like swipe/reject)
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        }
    }
});

export const {
    setUsers,
    appendUsers,
    setLoading,
    setError,
    resetFeed,
    removeUser
} = feedSlice.actions;

export default feedSlice.reducer;