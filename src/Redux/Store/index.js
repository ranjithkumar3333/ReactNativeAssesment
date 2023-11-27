import feedSlice from '../Reducer/feedSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
    reducer: {
        feedSlice: feedSlice
    },
});

export default store;
