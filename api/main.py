from flask import Flask, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r'/*': {'origins': 'https://react-shopping-abal.vercel.app*'}})

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://default:PwgKlWk2dtB9@ep-empty-mud-995772-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///accounts.db'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

@app.route('/user/', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        name = request.json.get('name')
        password = request.json.get('password')
        new_user = User(name=name, password=password)

        db.session.add(new_user)
        db.session.commit()
        print("Posted")
        return "Blank1"
    elif request.method =='GET':
        return "Blank2"
    else:
        return "Blank3"
    
@app.route('/')
def default():
    return "Hellos World"

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)

    