import {convertCurrency} from "../utility/utility.js";

const ProductTable = ({products, children = ''}) => {
    return (
        <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Total
                    </th>
                </tr>
                </thead>
                <tbody>
                {/*Mapping all product item*/}
                {products.map(product => (
                    <tr className="bg-white border-b" key={product.productName}>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"> {product.productName}
                        </th>
                        <td className="px-6 py-4">
                            <img src={product.productPicture} alt={product.productName}
                                 className='w-20'/>
                        </td>
                        <td className="px-6 py-4">
                            Rp {convertCurrency(product.sellingPrice * 1)}
                        </td>
                        <td className="px-6 py-4">
                            {product.quantity}
                        </td>
                        <td className="px-6 py-4">
                            Rp {convertCurrency(product.sellingPrice * product.quantity)}
                        </td>
                    </tr>
                ))}
                {children}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable