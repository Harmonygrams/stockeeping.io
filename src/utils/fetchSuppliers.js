import axios from 'axios'
const fetchSuppliers = (setProductDropdownOptions) => {
    const raw = JSON.stringify({user_id : "D4pag"})
    axios({
        method : 'POST',
        data : raw, 
        url : 'https://mousex.cf/api/getSuppliers/'
    }). 
    then(response => response.data).
    then(data => data.suppliers). 
    then(suppliers => {
        const newSuppliers = suppliers.map(supplier => ({label :supplier.name, value : supplier.id}))
        setProductDropdownOptions(prevData => {
            return {...prevData, suppliers : newSuppliers}
        })
    }).
    catch(err => console.log(err))
}
export default fetchSuppliers