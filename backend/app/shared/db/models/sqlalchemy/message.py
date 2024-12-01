import uuid
from datetime import datetime, timezone

from sqlmodel import Field, Relationship, SQLModel


class Message(SQLModel, table=True):
    __tablename__ = "message"
    Id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(
        foreign_key="user.Id", nullable=False, default=uuid.UUID(int=0)
    )
    chat_id: uuid.UUID = Field(foreign_key="chat.Id", nullable=False)
    message_text: str = Field(nullable=False)
    message_type: str = Field(default="simple", nullable=False)
    created_at: datetime = Field(
        default=lambda: datetime.now(timezone.utc), nullable=False
    )

    feedback: "Feedback" = Relationship(back_populates="message")
    chat: "Chat" = Relationship(back_populates="messages")
    user: "User" = Relationship(back_populates="messages")

    def export(self):
        return {
            "id": self.Id,
            "content": self.message_text,
            "createdAt": self.created_at,
            "userId": self.user_id,
            "role": "user" if self.user_id != uuid.UUID(int=0) else "ai",
            "type": self.message_type,
        }
