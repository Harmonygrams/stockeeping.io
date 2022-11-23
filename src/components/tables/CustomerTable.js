import COLUMNS from "../../config/customerTableConfig"
import {useEffect, useMemo, useState } from "react"
import { useTable, useSortBy, useBlockLayout, useResizeColumns} from 'react-table'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import {fetchCustomers} from '../../utils/'
const CustomerTable = () => {
    const [tableData, setTableData] = useState([])
    const [theadElWidth, setTheadElWith] = useState(null)
    const [columnsTable, setColumnsTable] = useState([])
    const defaultColumns = useMemo(() => ({
        minWidth : 30,
        width : 250,
        maxWidth : 500,
    }), [])
    const columns = useMemo(() => columnsTable, [columnsTable])
    const data = useMemo(() => tableData, [tableData])
    const tableInstance = useTable({
        columns,
        data, 
        defaultColumns
    }, useSortBy, useResizeColumns, useBlockLayout)
    const {
    getTableProps,
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow,
    } = tableInstance
    useEffect(() => {
        setTheadElWith(document.querySelector('thead').offsetWidth)
        setColumnsTable(COLUMNS(theadElWidth))
    }, [theadElWidth])
    useEffect(() => {
        const resizeElWith = () => {
            console.log('resizing') 
            setTheadElWith(document.querySelector('thead').offsetWidth)
            console.log(theadElWidth)
        }
        window.addEventListener('resize', resizeElWith)
        return () => window.removeEventListener('resize', resizeElWith)
    })
    useEffect(() => {
        fetchCustomers(setTableData)
    }, [])
    return(
        <div className="w-full px-4 mt-12 overflow-x-scroll md:overflow-x-hidden scroll-smooth md:flex"> 
            <table {...getTableProps()} className="w-full">
                <thead className="rounded-lg w-full flex items-center">
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className=""> 

                        {
                            headerGroup.headers.map(column => (
                                <th 
                                    {...column.getHeaderProps((column.id === "name" || column.id === "open_balance") && column.getSortByToggleProps())} 
                                    className= {column.isSorted ? "bg-gray-200 py-2 text-left px-2 text-sm font-semibold border-x-2 border-b-2 border-gray-300 text-gray-900" :  "py-2 text-left px-2 text-sm font-semibold border-x-2 border-b-2 border-gray-300 text-gray-900"}
                                > 
                                    <div className="flex items-center gap-2"> 
                                        {column.render('Header')}
                                        <span>{column.isSorted ? (column.isSortedDesc ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />) : ""}</span> 
                                        <div
                                            {...column.getResizerProps()}
                                            className ={`resizer ${column.isResizing ? "isResizing" : ""}`}
                                        />
                                    </div>
                                </th>
                            ))
                        }
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()} className=""> 
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()} className="transition hover:bg-gray-200 bg-white"> 
                                    {
                                        row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className= {cell.column.id === "name" ? "tracking-wider border-b-2 py-4 text-sm text-gray-600 font-light px-2 font-bold" : "border-b-2 py-4 text-sm text-gray-800 font-light px-2 w-full"}>
                                                {cell.render('Cell')}
                                            </td>
                                        ))
                                    }
                                </tr>
                            )
                        })   
                    }
                </tbody>
            </table>
        </div>
    )
}
export default CustomerTable