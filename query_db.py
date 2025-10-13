from flask import Flask
from backend.app import db, User, Journal
from backend.config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

with app.app_context():
    db.create_all()
    users = User.query.all()
    print('Users:')
    for u in users:
        print(f'ID: {u.id}, Username: {u.username}, Email: {u.email}')
    print('\nJournals:')
    journals = Journal.query.all()
    for j in journals:
        print(f'ID: {j.id}, User ID: {j.user_id}, Title: {j.title}, Content: {j.content[:50]}...')
