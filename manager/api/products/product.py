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
    low_stock = int(jned['low_stock'])
    description = jned['description']
    purchase_info  = jned['purchase_info']
    quantity = jned['quantity']
    
    created_at = int(time.time())
    updated_at = int(time.time())

    add_product_q = f'''
    insert into product(idx,supplier_id,brand_id,category_id,buy_price,esitmated_sell_price,sell_price,created_at,updated_at,namex,description,purchase_info,quantity,low_stock)
values('{token}','{supplier_id}','{brand_id}','{category_id}','{buy_price}','{sell_price_estimate}','{sell_price}','{created_at}','{updated_at}','{name}','{description}','{purchase_info}',{int(quantity)},{int(low_stock)})
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

def getProductStock(request):
    connection = connect()
    jned = json.loads(request.body)
    idx = jned['id']
    get_all_products_q = f'''
    select(
    select sum(item_purchased.quantity) from item_purchased join product on item_purchased.product_id = product.idx 
    where product.idx = '{idx}') - ( 

    select sum(item_sold.quantity) from item_sold join product on item_sold.product_id = product.idx
    where product.idx = '{idx}'
        )
    '''
    cursor = connection.cursor()
    cursor.execute(get_all_products_q)
    return HttpResponse(json.dumps({'status':'success','stock':cursor.fetchone()[0]}))

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



def getStockDetails(request):
    connection = connect()
    get_low_stock_q = f'''
    select count(*) from product
where quantity < low_stock 
    '''
    out_of_stock_q = f'''
    select count(*) from product 
where quantity = 0
    '''
    all_stock_q = f'''
    select count(*) from product

    '''
    cursor = connection.cursor()
    cursor.execute(get_low_stock_q)
    low_stocks = cursor.fetchone()
    cursor.execute(out_of_stock_q)
    out_of_stock = cursor.fetchone()
    cursor.execute(all_stock_q)
    all_stock = cursor.fetchone()
    print(all_stock)
    print(out_of_stock)
    print(low_stocks)
    return HttpResponse(json.dumps({'status':'success','low_stock':low_stocks[0],'out_of_stock':out_of_stock[0],'all_stock':all_stock[0]}))


@csrf_exempt
def loadStock(request):
    connection = connect()
    jned = json.loads(request.body)
    stock_increment_idx = tokenGen()
    supplier_id = jned['supplier_id']
    date_purchased = jned['date_purchased']
    email = jned['email']
    insert_empty_stock_q = f'''
    insert into stock_increment(idx,supplier_id,date_purchased,email)
    values('{stock_increment_idx}','{supplier_id}','{date_purchased}','{email}')
    '''
    cursor = connection.cursor()
    cursor.execute(insert_empty_stock_q)
    added_products = []
    for x in jned['products']:
        print('g')
        print(x)
        item_purchased_idx = tokenGen()
        added_products.append(item_purchased_idx)
        quantity = x['quantity']
        description = x['description']
        total_cost = x['total_cost']
        product_id = x['product_id']
        add_product_to_stock_q = f'''
        insert into item_purchased (idx,stock_increment_id,product_id,quantity,description,total_cost)
        values ('{item_purchased_idx}','{stock_increment_idx}','{product_id}',{quantity},'{description}','{total_cost}')
        '''
        cursor.execute(add_product_to_stock_q)
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','added_products':added_products , 'stock_increment_idx':stock_increment_idx}))
        
@csrf_exempt
def unloadStock(request):
    jned = json.loads(request.body)
    token = tokenGen()
    customer_id = jned['customer_id']
    date_sold = jned['date_sold']
    email = jned['email']
    details = jned['details']
    connection = connect()
    unload_stock_q = f''' 
    insert into stock_decrement (idx,customer_id,date_purchased,email,details)
    values('{token}','{customer_id}','{date_sold}','{email}','{details}')
    '''
    cursor = connection.cursor()
    cursor.execute(unload_stock_q)
    rowcount = cursor.rowcount
    print('we added stock main ',rowcount)
    # rowcount = connection.cursor().execute(unload_stock_q).rowcount
    removed_products = []
    for x in jned['products']:
        item_sold_idx = tokenGen()
        quantity = x['quantity']
        product_id = x['product_id']
        description = x['description']
        total_price = x['total_price']
        add_product_to_stock_q = f'''
        insert into item_sold (idx,stock_decrement_id,quantity,product_id,description,total_cost)
        values('{item_sold_idx}','{token}',{quantity},'{product_id}','{description}','{total_price}')
        '''
        cursor.execute(add_product_to_stock_q)
        rowcount = cursor.rowcount
        if rowcount == 1:
            removed_products.append(item_sold_idx)
    connection.commit()
    return HttpResponse(json.dumps({'status':'success','items_removed':removed_products,'token':token}))

def getIncrements(request):
    jned = json.loads(request.body)
    product_id = jned['product_id']
    get_increments_q = f'''
    select * from product join item_purchased on product.idx = item_purchased.product_id
    where 
    product.idx = '{product_id}'
    ''' 
    connection = connect()
    cursor = connection.cursor()
    cursor.execute(get_increments_q)
    returner = []
    for x in cursor.fetchall():
        returner.append(
            {
                "idx":x[14],
                "increment_id":x[15],
                "quantity" : x[16],
                "total_cost" : x[18]
            }
        )
    return HttpResponse(json.dumps({'status':'success','increments':returner}))


@csrf_exempt
def addCustomer(request):
    jned = json.loads(request.body)
    token = tokenGen()
    namex = jned['name']
    phone = jned['phone']
    email = jned['email']
    country = jned['country']
    city = jned['city']
    postcode = jned['postcode']
    address = jned['address']
    connection = connect()
    cursor = connection.cursor()
    add_customer_q = f'''
    insert into customer (idx,namex,phone,email,country,city,postcode,address)
    values ('{token}','{namex}','{phone}','{email}','{country}','{city}','{postcode}','{address}')
    '''
    cursor.execute(add_customer_q)
    connection.commit()
    rowcount = cursor.rowcount
    return HttpResponse(json.dumps({'status':'success','rowcount':rowcount,'token':token}))
        
        
def getCustomers(request):
    connection = connect()
    get_all_products_q = f'''select * from customer'''
    cursor = connection.cursor()
    cursor.execute(get_all_products_q)
    a = cursor.fetchall()
    returner = []
    for x in a :
        returner.append({'id':x[0],'name':x[1],'phone':x[2],'email':x[3],'country':x[4],'city':x[5],'postcode':x[6],'address':x[7]}) 
    print(a)
    return HttpResponse(json.dumps({'status':'success','customers':returner}))

