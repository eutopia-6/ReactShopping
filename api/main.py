from flask import Flask, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://default:PwgKlWk2dtB9@ep-empty-mud-995772.us-east-1.postgres.vercel-storage.com:5432/verceldb'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(100))


@app.route('/user', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        name = request.json.get('name')
        password = request.json.get('password')
        new_user = User(name=name, password=password)

        db.session.add(new_user)
        db.session.commit()
    elif request.method =='GET':
        data = User.query.all()
        response = [{'name': item.name, 'password':item.password} for item in data]
        return jsonify(response)
    else:
        return "Blank"
    
@app.route('/')
def default():
    return "Hellos World"

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)

    