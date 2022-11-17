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
                                    password="postgres",
                                    host="185.196.3.144",
                                    port="5432",
                                    database="manager2")
    except:
        print('error in connection ')
    return connection
        
        
@csrf_exempt
def createUser(request):
    print(request.body)
    jned = json.loads(request.body)
    email = jned['email']
    password = jned['password']
    name = jned['name']
    surname = jned['surname']
    phone = jned['phone']
    idx = tokenGen()
    connection = connect()
    cursor = connection.cursor()
    create_user_q = f'''
    insert into auth_user (idx,namex,surname,email,passwordx,phone)
    values('{idx}','{name}','{surname}','{email}','{password}','{phone}')
    '''
    cursor.execute(create_user_q)
    rowcount = cursor.rowcount
    if rowcount == 0:
        return HttpResponse('error')
    if rowcount == 1:
        connection.commit()
        return HttpResponse(json.dumps({'status':"success",'idx':idx}))