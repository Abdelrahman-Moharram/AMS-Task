from django .urls import path
from .views import *

app_name = 'home'
urlpatterns = [
    path('', index, name='index'),
    path('search/', search, name='search'),
    path('add/', add, name='add'),
    path('transfer/', transfer, name='transfer'),
    path('<str:id>/', details, name='details'),
    
    
]
