import {createSlice} from "@reduxjs/toolkit";

// Redux slice for Invoice

// Initial state
const initialState = {
    date: '',
    customerName: '',
    salespersonName: '',
    notes: '',
    products: []
}

// Define slice for invoice state
const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        setCustomerName: (state, action) => {
            state.customerName = action.payload
        },
        setSalespersonName: (state, action) => {
            state.salespersonName = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        addProduct: (state, action) => {
            state.products = action.payload
        },
        resetInvoice: state => {
            state.date = '';
            state.customerName = '';
            state.salespersonName = '';
            state.notes = '';
            state.products = [];
        }
    }
})

export const {
    setDate,
    setCustomerName,
    setSalespersonName,
    setNotes,
    addProduct,
    resetInvoice,
} = invoiceSlice.actions

export default invoiceSlice.reducer