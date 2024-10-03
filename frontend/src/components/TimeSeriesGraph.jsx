import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../features/invoiceLists/invoiceListSlice';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { convertDate, convertCurrency } from '../utility/utility'; 

const TimeSeriesGraph = () => {
    const dispatch = useDispatch();
    const { invoices, loading, error } = useSelector(state => state.invoiceList);
    const [data, setData] = useState({ daily: [], weekly: [], monthly: [] });
    const [selectedInterval, setSelectedInterval] = useState('daily');

    useEffect(() => {
        dispatch(fetchInvoices({ page: 0, size: 10 }));
    }, [dispatch]);

    useEffect(() => {
        if (invoices.length > 0) {
            const dailyData = aggregateData(invoices, 'day');
            const weeklyData = aggregateData(invoices, 'week');
            const monthlyData = aggregateData(invoices, 'month');
            setData({ daily: dailyData, weekly: weeklyData, monthly: monthlyData });
        }
    }, [invoices]);

    const aggregateData = (invoices, interval) => {
        const groupedData = invoices.reduce((acc, invoice) => {
            const date = new Date(invoice.date);
            let key;
            if (interval === 'day') {
                key = date.toISOString().split('T')[0];
            } else if (interval === 'week') {
                const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
                key = startOfWeek.toISOString().split('T')[0];
            } else if (interval === 'month') {
                key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            }
            if (!acc[key]) {
                acc[key] = { orders: 0, revenue: 0 };
            }
            acc[key].orders++;
            acc[key].revenue += invoice.invoice_products?.reduce((sum, product) => sum + (product.sellingPrice - product.productionPrice) * product.quantity, 0) || 0;
            return acc;
        }, {});
    
        return Object.keys(groupedData).map(key => ({
            date: new Date(key),
            orders: groupedData[key].orders,
            revenue: groupedData[key].revenue
        }));
    };

    const handleIntervalChange = (event) => {
        setSelectedInterval(event.target.value);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`Date: ${new Date(payload[0].payload.date).toLocaleDateString()}`}</p>
                    <p>{`Revenue: ${convertCurrency(payload[0].payload.revenue)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <select onChange={handleIntervalChange} value={selectedInterval}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <TransformWrapper>
                <TransformComponent>
                    <LineChart width={600} height={300} data={data[selectedInterval]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={convertDate} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    </LineChart>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default TimeSeriesGraph;
