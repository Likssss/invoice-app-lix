import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import ProductTable from "./ProductTable.jsx";
import { fetchInvoices, resetInvoices } from "../features/invoiceLists/invoiceListSlice.js";
import { convertDate, convertCurrency } from "../utility/utility.js";

// Custom styles for modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '45%',
        borderRadius: '10px'
    },
};

// Set modal parent element
Modal.setAppElement('#root');

const InvoiceList = ({ handleToggleShowForm, showForm, children }) => {
    const dispatch = useDispatch();
    const { invoices, totalPages, loading, error, currentPage } = useSelector((state) => state.invoiceList);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalInvoice, setModalInvoice] = useState({});
    const [page, setPage] = useState(0);
    const size = 6;

    const observer = useRef();

    const lastInvoiceElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && currentPage < totalPages - 1) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, currentPage, totalPages]);

    useEffect(() => {
        dispatch(fetchInvoices({ page, size }));
    }, [dispatch, page]);

    const handleToggleModal = (invoice = {}) => {
        setModalIsOpen(prevState => !prevState);
        setModalInvoice(invoice);
    };

    const handlePageChange = (page) => {
        dispatch(resetInvoices());
        setPage(page);
        dispatch(fetchInvoices({ page, size }));
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='w-2/5 border-2 border-blue-500 rounded p-5 my-10'>
            <h2 className='text-3xl font-bold text-center w-full mb-5'>Invoices List</h2>
            <div className='w-full flex justify-center items-center mb-5'>
                {showForm ? (
                    <button type='button'
                            className='bg-red-500 px-4 py-2 rounded-lg text-white text-sm border'
                            onClick={() => handleToggleShowForm()}>Hide Invoice Form
                    </button>
                ) : (
                    <button type='button'
                            className='bg-blue-500 px-4 py-2 rounded-lg text-white text-sm border'
                            onClick={() => handleToggleShowForm()}>Show Invoice Form
                    </button>
                )}

            </div>
            {children}
            <div className="flex flex-wrap justify-evenly">
                {invoices.map((invoice) => (
                    <div key={invoice.id} className="border-blue-500 border p-4 rounded mb-4 w-48 hover:shadow-lg"
                         onClick={() => handleToggleModal(invoice)}>
                        <h2 className='font-semibold text-xl mb-2'>Invoice #{invoice.id}</h2>
                        <p className='text-xs text-slate-500'>Customer Name</p>
                        <h3 className='font-semibold text-sm mb-2'>{invoice.customerName}</h3>
                        <p className='text-xs text-slate-500'>Salesperson Name</p>
                        <h3 className='font-semibold text-sm mb-2'>{invoice.salespersonName}</h3>
                        <p className='text-xs text-slate-500'>Total Amount</p>
                        <h3 className='font-semibold text-sm mb-2'>Rp {convertCurrency(invoice.invoice_products.reduce((total, product) => total + (product.sellingPrice * product.quantity), 0))}</h3>
                        <p className='text-xs text-slate-500'>Notes</p>
                        <h3 className='font-semibold text-sm mb-2'>{invoice.notes}</h3>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2">
                {[...Array(totalPages).keys()].map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}
                            className='bg-blue-500 px-2 py-1 rounded text-white'>
                        {page + 1}
                    </button>
                ))}
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='flex justify-between items-center mb-1'>
                    <h3 className='text-xl font-bold'>Invoice Product Detail</h3>
                    <button onClick={handleToggleModal}
                            className='bg-blue-500 px-2 py-1 text-xs text-white rounded-full'>X
                    </button>
                </div>
                <p className='font-semibold mb-4'>#{modalInvoice.id} <span
                    className='text-xs text-slate-500 font-normal ml-4'>{convertDate(modalInvoice.date)}</span></p>
                <div className='flex justify-between mb-5'>
                    <div>
                        <p className='text-xs text-slate-500'>Customer Name</p>
                        <p>{modalInvoice.customerName}</p>
                    </div>
                    <div>
                        <p className='text-slate-500 text-xs'>Salesperson Name</p>
                        <p>{modalInvoice.salespersonName}</p>
                    </div>
                </div>
                {modalInvoice.invoice_products &&
                    <ProductTable products={modalInvoice.invoice_products}>
                        <tr className="bg-white border-b">
                            <th scope="row" colSpan='4'
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Total
                            </th>
                            <td className="px-6 py-4 font-bold">
                                Rp {convertCurrency(modalInvoice.invoice_products.reduce((total, product) => total + (product.sellingPrice * product.quantity), 0))}
                            </td>
                        </tr>
                    </ProductTable>
                }
            </Modal>
        </div>
    );
};

export default InvoiceList;
