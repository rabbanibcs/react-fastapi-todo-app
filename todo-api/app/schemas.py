from pydantic import BaseModel,EmailStr
from typing import Union
from datetime import date, datetime, time, timedelta


class JobBase(BaseModel):
    title:str
    content:str
    
class JobCreate(JobBase):
    completed:bool=False

class JobUpdate(JobBase):
    completed:bool=False

# ctrl + D

class UserCreate(BaseModel):
    email:EmailStr
    password:str

class UserVerify(UserCreate):
    pass

class User(BaseModel):
    id:int
    email:EmailStr
    created_at:datetime

    class Config:
        orm_mode=True


class Job(BaseModel):
    title:str
    content:str
    id:int
    owner_id:int
    created_at:datetime
    completed:bool=False
    owner:User
    
    class Config:
        orm_mode=True


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Union[str, None] = None



















