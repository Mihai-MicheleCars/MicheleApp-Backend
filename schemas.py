from pydantic import BaseModel, EmailStr
from typing import Optional

class UtilizatorCreare(BaseModel):
    username: str
    email: EmailStr
    parola: str

class UtilizatorLogin(BaseModel):
    username: str
    parola: str

class Token(BaseModel):
    access_token: str
    token_type: str