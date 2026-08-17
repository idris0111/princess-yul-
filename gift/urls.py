from django.urls import path
from . import views

app_name = 'gift'

urlpatterns = [
    path('', views.home, name='home'),
    path('qualities/', views.qualities, name='qualities'),
    path('story/', views.story, name='story'),
    path('gallery/', views.gallery, name='gallery'),
    path('quiz/', views.quiz, name='quiz'),
    path('final/', views.final, name='final'),
]
