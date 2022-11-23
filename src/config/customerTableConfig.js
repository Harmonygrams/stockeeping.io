const COLUMNS = (theadElWidth) => {
    return(
    [
    {   
        Header : "Name", 
        accessor : "name",
        minWidth : 100, 
        maxWidth : 300,
        width : Math.round(((20/100) * theadElWidth))
    }, 
    {   
        Header : "Email", 
        accessor : "email",
        minWidth : 100, 
        maxWidth : 300,
        width : Math.round(((20/100) * theadElWidth))
    }, 
    {   
        Header : "Phone", 
        accessor : "phone", 
        minWidth : 100, 
        maxWidth : 300,
        width : Math.round(((20/100) * theadElWidth))
    }, 
    {   
        Header : "Open Balance", 
        accessor : "open_balance", 
        minWidth : 100, 
        maxWidth : 300,
        width : Math.round(((20/100) * theadElWidth))
    },
    {   
        Header : "Account", 
        accessor : "account", 
        minWidth : 100, 
        maxWidth : 300,
        width : Math.round(((20/100) * theadElWidth))
    }
])}
export default COLUMNS