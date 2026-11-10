from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

# Cheia secretă (în producție, aceasta trebuie ținută ascunsă!)
SECRET_KEY = "cheie_secreta_michele_pentru_test"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 zile

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_parola(parola: str):
    return pwd_context.hash(parola)

def verifica_parola(parola_literala: str, parola_hash: str):
    return pwd_context.verify(parola_literala, parola_hash)

def creeaza_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)