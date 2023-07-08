from flask import Flask, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://default:PwgKlWk2dtB9@ep-empty-mud-995772-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///accounts.db'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))

@app.route('/user', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        name = request.json.get('name')
        email = request.json.get('email')
        new_user = User(name=name, email=email)

        db.session.add(new_user)
        db.session.commit()
        return "Blank"
    elif request.method =='GET':
        return "Blank"
    else:
        return "Blank"
    
@app.route('/')
def default():
    return "Hellos World"

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)

    