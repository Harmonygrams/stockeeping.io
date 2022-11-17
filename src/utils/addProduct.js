import axios from 'axios'
const addProducts = async (formData, setAlert,setNewProductInformation) => {
    const newFormData = {
        name : formData.productName, 
        supplier_id : formData.productSupplierId,
        type : "inventory", 
        category_id : formData.productCategoryId,
        buy_price : Number(formData.productCostPrice),
        sell_price : Number(formData.productSalesPrice),
        description : formData.productDescription,
        sku_id : formData.productSku,
        purchase_info : "",
        quantity : Number(formData.productOnHandQty),
        low_stock : Number(formData.productRestockPoint), 
        brand_id : "",
        is_active : true, 
        added_date : new Date(formData.productAddedDate).toISOString(),
        user_id : "D4pag",
        expense_account : formData.productExpenseAccount, 
        income_account : formData.productIncomeAccount, 
    }
    const raw = JSON.stringify(newFormData)
    console.log(newFormData)
    axios({
        method : "POST", 
        data : raw,
        url : "https://mousex.cf/api/addProduct/"
    }).then(response => {
        const {status} = response.data
        if(status === 'success'){
            setAlert(true)
        }
        return status
    }).
    then(status => {
        return setNewProductInformation({
            productType : 'inventory',
            productName : "", 
            productDescription : "", 
            productCategoryId : "", 
            productSku : "", 
            productOnHandQty : "",
            productBrandId : "",
            productRestockPoint: "", 
            productAddedDate : "",
            productSalesPrice : "",
            productCostPrice : "",
            productSupplierId : "",
            productExpenseAccount : 'Cost Of Products', 
            productIncomeAccount : 'Sales Of Products'
        })
    }).
    catch(err => {console.log(err)})
}
export default addProducts
