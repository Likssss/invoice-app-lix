import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Setup function to fetch all invoices from server
export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async ({ page = 0, size = 10 } = {}) => {
        const response = await axios.get(`http://localhost:3000/api/invoices?page=${page}&size=${size}`);
        return response.data;
    }
);

// Define slice for invoiceList state
const invoiceListSlice = createSlice({
    name: 'invoiceList',
    initialState: {
        invoices: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        loading: false,
        error: null
    },
    reducers: {
        resetInvoices: (state) => {
            state.invoices = [];
            state.totalItems = 0;
            state.totalPages = 0;
            state.currentPage = 0;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvoices.pending, (state) => {
            state.loading = true;
        }).addCase(fetchInvoices.fulfilled, (state, action) => {
            state.invoices = action.payload.invoices;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        }).addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { resetInvoices } = invoiceListSlice.actions;
export default invoiceListSlice.reducer;
