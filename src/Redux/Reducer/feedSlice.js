import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../API/ApiPath';

const initialState = {
    feedData: [],
    status: 'idle',

};

export const fetchFeedData = createAsyncThunk('fetchFeedData', async () => {
    try {
        const response = await axios.get(URL).then((res) => {
            return res.data
        })
        return response;
    } catch (error) {
        throw Error('Error fetching feed data');
    }
});

const feedSlice = createSlice({
    name: 'feedSlice',
    initialState,
    reducers: {
        fetchFeedData(state, action) {
            console.log(action, "action");
            state.feedData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.feedData = action.payload
            })
    },
});

export default feedSlice.reducer;

