from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="frontend", template_folder="frontend")

# Serve index.html at root
@app.route("/")
def index():
    return send_from_directory("frontend", "index.html")

# Serve all other frontend files
@app.route("/<path:path>")
def static_files(path):
    return send_from_directory("frontend", path)

# Example backend API
@app.route("/api/hello")
def hello():
    return {"message": "Hello from Flask backend!"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
