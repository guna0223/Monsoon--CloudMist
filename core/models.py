from django.db import models
from django.contrib.auth.models import User


class Journal(models.Model):
    """Model for user monsoon journals/stories"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journals')
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='journals/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class Article(models.Model):
    """Model for monsoon articles"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']


class CommunityPost(models.Model):
    """Model for community posts/observations"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='community_posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content[:50]}..."

    class Meta:
        ordering = ['-created_at']
