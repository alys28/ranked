from django.urls import path
from resizeApp import views

urlpatterns = [
    path('', views.home, name='home'), 
    path('resize-image/', views.resize_image, name='resize_image'),
]
