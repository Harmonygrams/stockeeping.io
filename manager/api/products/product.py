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
    name = jned['name']
    supplier_id = jned['supplier_id']
    brand_id = jned['brand_id']
    category_id = jned['category_id']
    buy_price = jned['buy_price']
    sell_price_estimate = jned['sell_price_estimate']
    sell_price = jned['sell_price']
    
    description = jned['description']
    purchase_info  = jned['purchase_info']
    quantity = jned['quantity']
    
    created_at = int(time.time())
    updated_at = int(time.time())

    add_product_q = f'''
    insert into product(idx,supplier_id,brand_id,category_id,buy_price,esitmated_sell_price,sell_price,created_at,updated_at,namex,description,purchase_info,quantity)
values('{token}','{supplier_id}','{brand_id}','{category_id}','{buy_price}','{sell_price_estimate}','{sell_price}','{created_at}','{updated_at}','{name}','{description}','{purchase_info}',{int(quantity)})
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
    returner = []
    for x in a :
        returner.append({'id':x[0],'name':x[1],'supplier_id':x[2],'brand_id':x[3],'category_id':x[4],'buy_price':x[5],'sell_price_estimate':x[6],'sell_price':x[7],'created_at':x[8],'updated_at':x[9],'description':x[10],'purchase_info':x[11],'quantity':x[12]})
    return HttpResponse(json.dumps({'status':'success','products':returner}))



def getBrands(request):
    connection = connect()
    get_all_products_q = f'''select * from brand'''
    cursor = connection.cursor()
    cursor.execute(get_all_products_q)
    returner = []
    a = cursor.fetchall()
    for x in a:
        returner.append({'id':x[0],'name':x[1]})
    return HttpResponse(json.dumps({'status':'success','brands':returner}))


def getSuppliers(request):
    connection = connect()
    get_all_products_q = f'''select * from supplier'''
    cursor = connection.cursor()
    cursor.execute(get_all_products_q)
    a = cursor.fetchall()
    returner = []
    for x in a :
        returner.append({'id':x[0],'name':x[1],'phone':x[2],'email':x[3],'country':x[4],'city':x[5],'postcode':x[6],'address':x[7]}) 
    print(a)
    return HttpResponse(json.dumps({'status':'success','suppliers':returner}))

def getCategories(request):
    connection = connect()
    get_all_products_q = f'''select * from category'''
    cursor = connection.cursor()
    cursor.execute(get_all_products_q)
    a = cursor.fetchall()
    returner = []
    for x in a:
        returner.append({'id':x[0],'name':x[1]})
    return HttpResponse(json.dumps({'status':'success','category':returner}))