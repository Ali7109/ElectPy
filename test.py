# fetch from url: http://127.0.0.1:5000/objects

# with this snippet from test.py:
import requests

response = requests.get('http://127.0.0.1:5000/objects')
print(response.json())