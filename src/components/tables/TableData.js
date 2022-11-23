const TableData = ({name, type, description, sell_price, buy_price, quantity}) => {
    return(
        <tr> 
            <td className='text-sm px-2 py-8 border-2 text-gray-700 font-normal'> {name}</td>
            <td className='text-sm px-2 py-8 border-2 text-gray-700 font-normal'> {type}</td>
            <td className='text-sm px-2 py-8 border-2 text-gray-700 font-normal'> {description} </td>
            <td className='text-sm px-2 py-8 border-2 text-gray-700 font-normal'> {sell_price} </td>
            <td className='text-sm px-2 py-8 border-2 text-gray-700 font-normal'> {buy_price} </td>
            <td className='text-sm px-2 py-8 border-2 text-gray-700 font-normal'> {quantity} </td>
        </tr>
    )
}
export default TableData