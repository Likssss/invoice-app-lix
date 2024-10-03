// actions/invoiceActions.js
import axios from 'axios';

export const fetchInvoices = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/invoices');
        dispatch({ type: 'FETCH_INVOICES_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_INVOICES_FAILURE', payload: error });
    }
};
