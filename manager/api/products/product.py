import psycopg2
import random
import json
import time
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
# make a function that generates a random token 
def tokenGen(length=5):
    import string
    import random
    lettersAndDigits = string.ascii_letters + string.digits
    token = ''.join((random.choice(lettersAndDigits) for i in range(length)))
    return token

def connect():
    try:
        connection = psycopg2.connect(user="postgres",
                                    password="0000",
                                    host="127.0.0.1",
                                    port="5432",
                                    database="manager2")
    except:
        print('error in connection ')
    return connection
        
# @csrf_exempt
@csrf_exempt
def addSupplier(request):
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    token = tokenGen()
    namex = jned['name']
    phone = jned['phone']
    email = jned['email']
    country = jned['country']
    city = jned['city']
    postcode = jned['postcode']
    address = jned['address']
    add_supplier_q = f'''
    insert into supplier(idx,namex,email,phone,country,city,postcode,address)
values ('{token}','{namex}','{email}','{phone}','{country}','{city}','{postcode}','{address}')
    '''
    cursor = connection.cursor()
    cursor.execute(add_supplier_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':token}))



@csrf_exempt
def addBrand(request):
    token = tokenGen()
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    name = jned['name']   
    add_brand_q = f'''
insert into brand(idx,namex)
values ('{token}','{name}')

    '''
    cursor = connection.cursor()
    cursor.execute(add_brand_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':token}))


@csrf_exempt
def addCategory(request):
    token = tokenGen()
    connection = connect()
    jned = json.loads(request.body)
    # idx = jned['id']
    name = jned['name']   
    add_brand_q = f'''
insert into category(idx,namex)
values ('{token}','{name}')

    '''
    cursor = connection.cursor()
    cursor.execute(add_brand_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':token}))

@csrf_exempt
def addProduct(request):
    token = tokenGen()
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
    insert into product(idx,supplier_id,brand_id,category_id,buy_price,esitmated_sell_price,sell_price,created_at,updated_at)
values('{token}','{supplier_id}','{brand_id}','{category_id}','{buy_price}','{sell_price_estimate}','{sell_price}','{created_at}','{updated_at}')
    '''
    cursor = connection.cursor()
    cursor.execute(add_product_q)
    a = cursor.rowcount
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','other':token}))




def getProducts(request):
    connection = connect()
    get_all_products_q = f'''select * from product'''
    cursor = connection.cursor()
    cursor.execute(get_all_products_q)
    a = cursor.fetchall()
    print(a)
    return HttpResponse(json.dumps({'status':'success','other':a}))