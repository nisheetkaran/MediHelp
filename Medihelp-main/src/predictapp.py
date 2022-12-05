import numpy as np
from flask import Flask, request, jsonify, render_template, json
import pickle
from flask_cors import CORS

app=Flask(__name__)
model=pickle.load(open('model.pkl','rb'))

@app.route('/')
def hello_world():
    return "<h1>Hello world</h1>"

new_input = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

@app.route('/predict', methods=['POST'])
def predict():
    request_data= json.loads(request.data)
    inputdata= request_data['input']
    output=model.predict(inputdata)
    print(output)
    # print(type(output[0]))
    # finaloutput=output[0].tobytes()
    # print(finaloutput)
    # return {'201':'successful'}
    # return 'abcd'
    return {'disease':output[0]}

if __name__=="__main__":
    app.run(debug=True)

