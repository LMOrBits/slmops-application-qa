import uuid

from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime,timezone
import uuid
from typing import List

class Chat(SQLModel, table=True):
    Id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field( default=lambda: datetime.now(timezone.utc), nullable=False)
    user_id: uuid.UUID = Field( foreign_key="user.Id", nullable=False,)
    
    user : "User" = Relationship( back_populates="chats")
    messages : List["Message"] = Relationship(back_populates="chat")
    