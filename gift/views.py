from django.shortcuts import render
from .models import Photo


def home(request):
    return render(request, 'gift/home.html')


def qualities(request):
    return render(request, 'gift/qualities.html')


def story(request):
    return render(request, 'gift/story.html')


def gallery(request):
    photos = Photo.objects.all()
    return render(request, 'gift/gallery.html', {'photos': photos})


def quiz(request):
    return render(request, 'gift/quiz.html')


def final(request):
    return render(request, 'gift/final.html')
