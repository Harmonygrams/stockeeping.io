import axios from 'axios'
const fetchProducts = (setTableData) => {
    const raw = JSON.stringify({
        user_id : "D4pag"
    })
    axios({
        method : "POST", 
        url : "https://mousex.cf/api/getProducts/", 
        data : raw
    }).
    then(response => response.data).
    then(data => {
        const productsArray = data.products
        setTableData(productsArray)
    }).
    catch(err => console.log(err))
}
export default fetchProducts