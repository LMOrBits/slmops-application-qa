import uuid

from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    Id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str = Field(default="", nullable=True)

    cookie: "Cookie" = Relationship(back_populates="user")
    feedbacks: list["Feedback"] = Relationship(back_populates="user")
    chats: list["Chat"] = Relationship(back_populates="user")
    messages: list["Message"] = Relationship(back_populates="user")
