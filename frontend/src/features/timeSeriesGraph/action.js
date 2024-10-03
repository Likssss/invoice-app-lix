export const fetchData = () => async dispatch => {
    try {
        const response = await fetch('/api/invoices');
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging line
        dispatch({ type: 'SET_DATA', payload: data.invoices });
    } catch (error) {
        console.error('Error fetching data:', error); // Debugging line
    }
};
