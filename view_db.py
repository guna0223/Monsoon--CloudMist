import sqlite3

conn = sqlite3.connect('monsoon.db')
cursor = conn.cursor()

print("Users:")
cursor.execute("SELECT * FROM user")
users = cursor.fetchall()
for user in users:
    print(user)

print("\nJournals:")
cursor.execute("SELECT * FROM journal")
journals = cursor.fetchall()
for journal in journals:
    print(journal)

conn.close()
