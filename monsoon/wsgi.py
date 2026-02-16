"""
WSGI config for Monsoon CloudMist project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'monsoon.settings')
application = get_wsgi_application()
