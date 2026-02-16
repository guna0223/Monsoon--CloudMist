from django.urls import path
from . import views

urlpatterns = [
    # Main pages
    path('', views.home, name='home'),
    path('articles/', views.articles, name='articles'),
    path('journals/', views.journals, name='journals'),
    path('community/', views.community, name='community'),
    path('profile/', views.profile, name='profile'),
    
    # Authentication
    path('login/', views.user_login, name='login'),
    path('register/', views.user_register, name='register'),
    path('logout/', views.user_logout, name='logout'),
    
    # Journal actions
    path('journal/create/', views.create_journal, name='create_journal'),
    path('journal/edit/<int:journal_id>/', views.edit_journal, name='edit_journal'),
    path('journal/delete/<int:journal_id>/', views.delete_journal, name='delete_journal'),
    
    # Community actions
    path('community/post/', views.create_community_post, name='create_community_post'),
    
    # API endpoints
    path('api/articles/', views.api_articles, name='api_articles'),
    path('api/community/', views.api_community, name='api_community'),
]
