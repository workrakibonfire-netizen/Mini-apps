from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return {
        "status": "ok",
        "message": "BD94 Mini App API Running"
    }

@app.route("/api/test")
def test():
    return {
        "success": True,
        "message": "API Connected"
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
