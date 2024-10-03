import {useState} from 'react';
import {toast} from "react-toastify";
import {FaCirclePlus} from 'react-icons/fa6'
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';

import {productData} from "../data/products.js";
import {
    setDate,
    setCustomerName,
    setSalespersonName,
    setNotes,
    resetInvoice,
    addProduct
} from '../features/invoices/invoiceSlice.js'
import {fetchInvoices} from "../features/invoiceLists/invoiceListSlice.js";

import ProductTable from "./ProductTable.jsx";
import {convertCurrency} from "../utility/utility.js";

const InvoiceForm = ({handleToggleShowForm}) => {
    // Init state for product input
    const [productInput, setProductInput] = useState('');

    // Init state for product suggestions
    const [productSuggestions, setProductSuggestions] = useState([]);

    // Setup dispatch and get state from redux invoice state
    const dispatch = useDispatch()
    const {date, customerName, salespersonName, notes, products} = useSelector(state => state.invoice)

    // Function handler for product suggestion
    const handleProductChange = (e) => {
        setProductInput(e.target.value);

        // Compare keyword from input to data products, if it founds similar items, it will be suggested to user
        if (e.target.value.length > 1) {
            const suggestions = productData.filter(product =>
                product.productName.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setProductSuggestions(suggestions);
        } else {
            setProductSuggestions([]);
        }
    };

    // Function handler when user add product to chart
    const handleAddProduct = (product) => {
        // If item already in chart, it will increase the quantity, but if not it will add the product item
        if (products.find(item => item.productName === product.productName)) {
            dispatch(addProduct(products.map(item => item.productName === product.productName ? {
                ...item,
                quantity: item.quantity + 1
            } : item)))
        } else {
            dispatch(addProduct([...products, {...product, quantity: 1}]))
        }
        setProductInput('');
        setProductSuggestions([]);
    };

    // Function handler when user submit to create the Invoice
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check to make sure all data is not null
        if (!date || !customerName || !salespersonName || !products.length) {
            toast('All mandatory fields must be filled')
            return;
        }

        // Fetch POST request to server to create Invoice and InvoiceProduct data
        try {
            await axios.post('http://localhost:3000/api/invoices', {
                date,
                customerName,
                salespersonName,
                notes,
                products
            });
            // Notify the user if invoice has successfully created
            toast('Invoice created successfully')
            dispatch(resetInvoice())
            handleToggleShowForm()
            dispatch(fetchInvoices({page: 0, size: 6}));
        } catch (error) {
            // Notify the user if there is some error
            toast('Error creating invoice')
        }
    };

    // Render UI
    return (
    <div className='content w-full border-2 border-teal-500 rounded p-5 my-10 bg-white'>
        <h1 className='text-2xl font-bold text-center mb-5 text-teal-700'>Create Invoice</h1>
        <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
                <label className='block text-base font-medium leading-6 text-gray-900 mb-2'>Date</label>
                <input type="date"
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-2 px-4'
                    value={date} onChange={(e) => dispatch(setDate(e.target.value))} required/>
            </div>
            <div>
                <label className='block text-base font-medium leading-6 text-gray-900 mb-2'>Customer Name</label>
                <input type="text"
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-2 px-4'
                    value={customerName} onChange={(e) => dispatch(setCustomerName(e.target.value))}
                    placeholder='John'
                    required/>
            </div>
            <div>
                <label className='block text-base font-medium leading-6 text-gray-900 mb-2'>Salesperson Name</label>
                <input type="text"
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-2 px-4'
                    value={salespersonName} onChange={(e) => dispatch(setSalespersonName(e.target.value))}
                    placeholder='Doe'
                    required/>
            </div>
            <div>
                <label className='block text-base font-medium leading-6 text-gray-900 mb-2'>Notes</label>
                <textarea
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-2 px-4'
                    value={notes} onChange={(e) => dispatch(setNotes(e.target.value))}
                    placeholder='Notes about this Invoice..'></textarea>
            </div>
            <div>
                <label className='block text-base font-medium leading-6 text-gray-900 mb-2'>Add Products</label>
                <input type="text"
                    className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 py-2 px-4'
                    value={productInput} onChange={handleProductChange}/>
                <div className='mt-2'>
                    {productSuggestions.map((product) => (
                        <div key={product.productName}>
                            <div
                                className='border-2 border-teal-500 p-2 my-2 rounded-lg flex justify-between items-center'>
                                <div>{product.productName} - Rp {convertCurrency(product.sellingPrice)}</div>
                                <FaCirclePlus className='text-teal-500 text-xl cursor-pointer'
                                            onClick={() => handleAddProduct(product)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {products.length > 0 && (
                <div className='mt-4'>
                    <p className='text-base font-medium leading-6 text-gray-900 mb-2'>Selected Product</p>
                    <ProductTable products={products}/>
                </div>
            )}
            <button type="submit"
                    className="flex w-full justify-center rounded-md bg-teal-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-600">Submit
            </button>
        </form>
    </div>


    );
};

export default InvoiceForm;