from sqlmodel import SQLModel, Field, Relationship
import uuid
from typing import List, Optional

class User(SQLModel, table=True):
    
    Id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str = Field(default="", nullable=True)
   

    cookie: "Cookie" = Relationship(back_populates="user")
    feedbacks: List["Feedback"]  = Relationship(back_populates="user")
    chats: List["Chat"] = Relationship(back_populates="user")
    messages: List["Message"] = Relationship(back_populates="user")