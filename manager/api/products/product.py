import psycopg2
import random
import json
import time
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
def connect():
    try:
        connection = psycopg2.connect(user="postgres",
                                    password="0000",
                                    host="127.0.0.1",
                                    port="5432",
                                    database="manager")
    except:
        print('error in connection ')
    return connection
        
# @csrf_exempt
@csrf_exempt
def addSupplier(request):
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    namex = jned['name']
    phone = jned['phone']
    email = jned['email']
    country = jned['country']
    city = jned['city']
    postcode = jned['postcode']
    address = jned['address']
    add_supplier_q = f'''
    insert into supplier(namex,email,phone,country,city,postcode,address)
values ('{namex}','{email}','{phone}','{country}','{city}','{postcode}','{address}')
    '''
    cursor = connection.cursor()
    cursor.execute(add_supplier_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':a}))



@csrf_exempt
def addBrand(request):
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    name = jned['name']   
    add_brand_q = f'''
insert into brand(namex)
values ('{name}')

    '''
    cursor = connection.cursor()
    cursor.execute(add_brand_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':a}))


@csrf_exempt
def addCategory(request):
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    name = jned['name']   
    add_brand_q = f'''
insert into category(namex)
values ('{name}')

    '''
    cursor = connection.cursor()
    cursor.execute(add_brand_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':a}))

@csrf_exempt
def addProduct(request):
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    supplier_id = jned['supplier_id']
    brand_id = jned['brand_id']
    category_id = jned['category_id']
    buy_price = jned['buy_price']
    sell_price_estimate = jned['sell_price_estimate']
    sell_price = jned['sell_price']
    created_at = int(time.time())
    updated_at = int(time.time())
    
    # namex = jned['name']
    # phone = jned['phone']
    # email = jned['email']
    # country = jned['country']
    # city = jned['city']
    # postcode = jned['postcode']
    # address = jned['address']
    add_product_q = f'''
    insert into product(supplier_id,brand_id,category_id,buy_price,esitmated_sell_price,sell_price,created_at,updated_at)
values('{supplier_id}','{brand_id}','{category_id}','{buy_price}','{sell_price_estimate}','{sell_price}','{created_at}','{updated_at}')
    '''
    cursor = connection.cursor()
    cursor.execute(add_product_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':a}))