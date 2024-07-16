from .Serializer import AccountsSerializer
from .models import account
from rest_framework import response, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .helpers import to_int, read_data


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
        for _, row in df.iterrows():
            if not account.objects.exists(id=row[0]):
                account.objects.create(id=row[0], name=row[1], balance=row[2])
    return response.Response({'message':'Data Uploaded Successfully'}, status=status.HTTP_200_OK)


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

@api_view(['GET'])
@permission_classes((AllowAny,))
def search(request):
    query = request.GET.get('query')
    if not query:
        return response.Response(
            data={'detail':'invalid search value'},
            status=status.HTTP_400_BAD_REQUEST
        )
    accs = account.objects.filter(name__contains=query)
    if not accs.count():
        return response.Response(data={'detail':'No Valid Accounts with this data'})
    accs_serial = AccountsSerializer(data=accs, many=True)

    if not accs_serial.is_valid():
        pass

    return response.Response(
        data={'accounts': accs_serial.data},
        status=status.HTTP_200_OK
    )