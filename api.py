from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "status": "online"
    })

@app.route("/api/test")
def test():
    return jsonify({
        "success": True,
        "message": "BD94 API Working"
    })

if __name__ == "__main__":
    app.run()
