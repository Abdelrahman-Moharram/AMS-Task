from .Serializer import AccountsSerializer
from .models import account
from rest_framework import response, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .helpers import to_int, read_data
import json

@api_view(['GET'])
@permission_classes((AllowAny,))
def index(request):
    page = to_int(request.GET.get('page'), 0)
    size = to_int(request.GET.get('size'), 20)
    accounts_serial = AccountsSerializer(
        data= account.objects.all()[page*size : (page+1) * size], 
        many=True
    )

    if accounts_serial.is_valid():
        pass
    
    return response.Response(data={
        "page" : page,
        "size": size,
        "total":int(account.objects.count()/size) or 1,
        "accounts": accounts_serial.data,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((AllowAny,))
def add(request):
    if len(request.FILES):
        df = read_data(request.FILES['file'])
        counter = 0
        for _, row in df.iterrows():
            if not account.objects.filter(id=row[0]).count():
                account.objects.create(id=row[0], name=row[1], balance=row[2])
                counter += 1
        return response.Response({'message':f'Data Uploaded Successfully {counter} row added'}, status=status.HTTP_200_OK)
    return response.Response({'detail':"Data isn't invalid"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def details(request, id):
    acc = account.objects.filter(id=id)

    if not acc.count():
        return response.Response(data={'detail':'No Valid Account with this data'})
    acc_serial = AccountsSerializer(data=acc, many=True)

    if not acc_serial.is_valid():
        pass

    return response.Response(
        data={'account': acc_serial.data[0]},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
@permission_classes((AllowAny,))
def search(request):
    body = json.loads(request.body)
    
    if 'query' not in body:
        return response.Response(
            data={'detail':'invalid search value'},
            status=status.HTTP_400_BAD_REQUEST
        )
    if 'exclude' not in body:
        accs = account.objects.filter(name__contains=body['query'])
    else:
        accs = account.objects.filter(name__contains=body['query']).exclude(id__in=body['exclude'])
        print(body['exclude'])
    if not accs.count():
        return response.Response(data={'detail':'No Valid Accounts with this data'})
    accs_serial = AccountsSerializer(data=accs, many=True)

    if not accs_serial.is_valid():
        pass

    return response.Response(
        data={'accounts': accs_serial.data},
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
@permission_classes((AllowAny,))
def transfer(request):
    body = json.loads(request.body)
    if 'from' not in body:
        return response.Response(data={'detail': 'invalid data you should select account to send money from'}, status=status.HTTP_400_BAD_REQUEST)
    
    if 'to' not in body:
        return response.Response(data={'detail': 'invalid data you should select account to send money to'}, status=status.HTTP_400_BAD_REQUEST)
    
    if body['from'] == body['to']:
        return response.Response(data={'detail': "invalid Transfer operation you can't transfer money to your self"}, status=status.HTTP_400_BAD_REQUEST)
    if 'amount' not in body:
        return response.Response(data={'detail': 'invalid amount data you should enter a valid amount'}, status=status.HTTP_400_BAD_REQUEST)
    
    from_acc  = account.objects.filter(id=body['from']).first()
    to_acc  = account.objects.filter(id=body['to']).first()

    if not from_acc:
        return response.Response(data={'detail': 'sender account is not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if not to_acc:
        return response.Response(data={'detail': 'receiver account is not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if body['amount'] > from_acc.balance:
        return response.Response(data={'detail': f'amount is not enough your allowed balance is {from_acc.balance}'}, status=status.HTTP_400_BAD_REQUEST)
    
    if body['amount'] <= 0:
        return response.Response(data={'detail': f'invalid entered amount please enter a valid positive value between (0 and {from_acc.balance}) '}, status=status.HTTP_400_BAD_REQUEST)
    
    # Transfering 
    from_acc.balance -= body['amount']
    to_acc.balance += body['amount']
    from_acc.save()
    to_acc.save()
    return response.Response(
            data={'message':f'money transfared from {from_acc.name} to {to_acc.name} successfully!'}, 
            status=status.HTTP_200_OK
        )