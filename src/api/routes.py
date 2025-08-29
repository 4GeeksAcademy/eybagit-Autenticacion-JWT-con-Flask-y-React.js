from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

 
@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if not body:
        raise APIException("Faltan datos", status_code=400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("El usuario ya existe", status_code=400)

   
    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado exitosamente"}), 201


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body:
        raise APIException("Faltan datos", status_code=400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        raise APIException("Email y contraseña son requeridos", status_code=400)

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        raise APIException("Credenciales inválidas", status_code=401)

    access_token = create_access_token(identity=str(user.id))

    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        raise APIException("Usuario no encontrado", status_code=404)

    return jsonify({"msg": f"Bienvenido {user.email}, tu acceso es válido"}), 200
