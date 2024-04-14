from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

"""
 Define your scripts (array of objects of structure: {
    id: number,
    script_name: string,
    script_content: string (this will be python syntax with formatting like new lines, tabs, etc.)
})
"""
scripts = [
    {
        "id": 1,
        "script_name": "Hello World",
        "script_content": "<span class='function'>print</span>(<span class='string'>'Hello World'</span>)"
    },
    {
        "id": 2,
        "script_name": "Addition",
        "script_content": "<span class='variable'>a</span> = <span class='number'>5</span>\n<span class='variable'>b</span> = <span class='number'>10</span>\n<span class='function'>print</span>(<span class='variable'>a</span> + <span class='variable'>b</span>)"
    },
    {
        "id": 3,
        "script_name": "Subtraction",
        "script_content": "<span class='variable'>a</span> = <span class='number'>5</span>\n<span class='variable'>b</span> = <span class='number'>10</span>\n<span class='function'>print</span>(<span class='variable'>a</span> - <span class='variable'>b</span>)"
    }
]


@app.route('/objects', methods=['GET'])
def get_objects():
    return jsonify(scripts)

if __name__ == '__main__':
    app.run(debug=True)
