from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
import models, schemas, security
from database import engine, SessionLocal, Base

# Creăm tabelele la pornire
Base.metadata.create_all(bind=engine)

app = FastAPI(title="MICHELE Automotive API")

# Definim cum arată sistemul de securitate
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# Funcție pentru a obține o conexiune la baza de date
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def citeste_root():
    return {"status": "OK", "mesaj": "Salut! Serverul MICHELE functioneaza perfect!"}

@app.post("/api/register", response_model=schemas.Token)
def inregistrare(user: schemas.UtilizatorCreare, db: Session = Depends(get_db)):
    # Verificăm dacă username-ul există deja
    if db.query(models.Utilizator).filter(models.Utilizator.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username deja folosit")
    # Verificăm dacă email-ul există deja
    if db.query(models.Utilizator).filter(models.Utilizator.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email deja folosit")
    
    # Creăm utilizatorul nou
    nou_user = models.Utilizator(
        username=user.username,
        email=user.email,
        parola_hash=security.hash_parola(user.parola),
        status_abonament="trial"
    )
    db.add(nou_user)
    db.commit()
    db.refresh(nou_user)
    
    # Generăm token-ul de logare
    token = security.creeaza_token({"sub": nou_user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/api/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    utilizator = db.query(models.Utilizator).filter(models.Utilizator.username == form_data.username).first()
    
    if not utilizator or not security.verifica_parola(form_data.password, utilizator.parola_hash):
        raise HTTPException(status_code=401, detail="Username sau parolă incorecte")
    
    token = security.creeaza_token({"sub": utilizator.username})
    return {"access_token": token, "token_type": "bearer"}