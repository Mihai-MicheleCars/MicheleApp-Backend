from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Utilizator(Base):
    __tablename__ = "utilizatori"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    parola_hash = Column(String)
    este_admin = Column(Integer, default=0)
    status_abonament = Column(String, default="trial")
    data_creare = Column(DateTime(timezone=True), server_default=func.now())