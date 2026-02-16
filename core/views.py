from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Journal, Article, CommunityPost
import json


def home(request):
    """Home page view"""
    return render(request, 'core/index.html')


def articles(request):
    """Articles page view"""
    articles = Article.objects.all()
    return render(request, 'core/articles.html', {'articles': articles})


def journals(request):
    """Journals page view"""
    return render(request, 'core/journals.html')


def community(request):
    """Community page view"""
    posts = CommunityPost.objects.all()[:50]
    return render(request, 'core/community.html', {'posts': posts})


def profile(request):
    """Profile page view"""
    if not request.user.is_authenticated:
        messages.info(request, 'Please log in to view your profile.')
        return redirect('login')
    
    journals = request.user.journals.all()
    return render(request, 'core/profile.html', {'journals': journals})


def user_login(request):
    """Login view"""
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'core/login.html')


def user_register(request):
    """Registration view"""
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        
        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'core/register.html')
        
        if len(password1) < 8:
            messages.error(request, 'Password must be at least 8 characters.')
            return render(request, 'core/register.html')
        
        from django.contrib.auth.models import User
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists.')
            return render(request, 'core/register.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists.')
            return render(request, 'core/register.html')
        
        user = User.objects.create_user(username=username, email=email, password=password1)
        login(request, user)
        messages.success(request, 'Registration successful!')
        return redirect('home')
    
    return render(request, 'core/register.html')


def user_logout(request):
    """Logout view"""
    logout(request)
    return redirect('home')


# API Views for AJAX
@login_required
def create_journal(request):
    """Create a new journal"""
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        image = request.FILES.get('image')
        
        journal = Journal.objects.create(
            user=request.user,
            title=title,
            content=content,
            image=image
        )
        
        messages.success(request, 'Journal created successfully!')
        return redirect('profile')
    
    return redirect('journals')


@login_required
def edit_journal(request, journal_id):
    """Edit an existing journal"""
    journal = Journal.objects.get(id=journal_id, user=request.user)
    
    if request.method == 'POST':
        journal.title = request.POST.get('title')
        journal.content = request.POST.get('content')
        
        if request.FILES.get('image'):
            journal.image = request.FILES.get('image')
        
        journal.save()
        messages.success(request, 'Journal updated successfully!')
        return redirect('profile')
    
    return render(request, 'core/edit_journal.html', {'journal': journal})


@login_required
def delete_journal(request, journal_id):
    """Delete a journal"""
    journal = Journal.objects.get(id=journal_id, user=request.user)
    journal.delete()
    messages.success(request, 'Journal deleted successfully!')
    return redirect('profile')


@login_required
def create_community_post(request):
    """Create a new community post"""
    if request.method == 'POST':
        content = request.POST.get('content')
        
        CommunityPost.objects.create(
            user=request.user,
            content=content
        )
        
        messages.success(request, 'Post created successfully!')
        return redirect('community')
    
    return redirect('community')


def api_articles(request):
    """API endpoint for articles"""
    articles = Article.objects.all()
    data = [{'id': a.id, 'title': a.title, 'content': a.content, 'created_at': a.created_at.isoformat()} for a in articles]
    return JsonResponse(data, safe=False)


def api_community(request):
    """API endpoint for community posts"""
    posts = CommunityPost.objects.all()[:50]
    data = [{'id': p.id, 'user': p.user.username, 'content': p.content, 'created_at': p.created_at.isoformat()} for p in posts]
    return JsonResponse(data, safe=False)
