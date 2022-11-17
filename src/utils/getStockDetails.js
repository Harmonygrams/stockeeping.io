import axios from 'axios'
const getStockDetails = (setStockDetails,setIsLoadingResources) => {
    const raw = JSON.stringify({user_id : "D4pag"})
    axios({
        method : "POST", 
        url : "https://mousex.cf/api/getStockDetails/", 
        data : raw
    }). 
    then(response => {
        const  {status, low_stock, out_of_stock, all_stock}= response.data
        if(status === 'success'){
            setStockDetails(prev => ({lowStock : low_stock, outOfStock : out_of_stock, totalStock : all_stock}))
        }
        return response
    }). 
    then(response => setIsLoadingResources(prev => ({...prev, stockDetails : false}))).
    catch(err => console.log(err))
}
export default getStockDetails