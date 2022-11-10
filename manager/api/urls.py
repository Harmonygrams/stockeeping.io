from django.urls import path 
from .products import product
from .products import user
urlpatterns = [ 
# temp user posts a link and this gets triggered
path('addSupplier/', product.addSupplier),
path('addBrand/', product.addBrand),
path('addCategory/', product.addCategory),
path('addProduct/', product.addProduct),
path('addStock/', product.loadStock),
path('addCustomer/', product.addCustomer),
path('unloadStock/', product.unloadStock),

path('getProducts/', product.getProducts),
path('getBrands/', product.getBrands),
path('getSuppliers/', product.getSuppliers),
path('getCategories/', product.getCategories),
path('getStockDetails/', product.getStockDetails),
path('getIncrements/', product.getIncrements),
path('getCustomers/', product.getCustomers),
path('getProductStock/', product.getProductStock), # POST

path('createUser/', user.createUser),



]