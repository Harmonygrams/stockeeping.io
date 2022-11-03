from django.urls import path 
from .products import product

urlpatterns = [ 
# temp user posts a link and this gets triggered
path('addSupplier/', product.addSupplier),
path('addBrand/', product.addBrand),
path('addCategory/', product.addCategory),
path('addProduct/', product.addProduct),
path('getProducts/', product.getProducts)


]