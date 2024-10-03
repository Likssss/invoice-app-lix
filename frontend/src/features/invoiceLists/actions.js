import axios from 'axios';

export const fetchInvoices = (page, size) => async (dispatch) => {
    dispatch({ type: 'FETCH_INVOICES_REQUEST' });
    try {
        const response = await axios.get(`http://localhost:3000/api/invoices?page=${page}&size=${size}`);
        const data = response.data;
        dispatch({ type: 'FETCH_INVOICES_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'FETCH_INVOICES_FAILURE', error });
    }
};
