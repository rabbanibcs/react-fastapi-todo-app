
from sqlalchemy import Column, Boolean,  ForeignKey, Integer, String
from .database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.types import DateTime,Time
from datetime import datetime
from sqlalchemy.orm import relationship

class Job(Base):
    __tablename__='jobs'

    id=Column(Integer,primary_key=True)
    title=Column(String,nullable=False)
    content=Column(String,nullable=False)
    completed=Column(Boolean, server_default='false',nullable=False)
    created_at=Column(DateTime(timezone=True),default=datetime.utcnow)
    completed_at=Column(DateTime(timezone=True),nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"),nullable=False)

    owner=relationship("User")


    def __repr__(self) -> str:
        return f"{self.title}"


class User(Base): 
    __tablename__='users'

    id=Column(Integer,primary_key=True,nullable=False)
    name=Column(String,nullable=True)
    email=Column(String,nullable=False,unique=True)
    password=Column(String,nullable=False)
    created_at=Column(DateTime(timezone=True),default=datetime.utcnow)
    

    def __repr__(self) -> str:
        return f"{self.email}"


















