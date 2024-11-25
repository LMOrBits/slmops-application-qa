import uuid

from sqlmodel import Field, Relationship, SQLModel


class Feedback(SQLModel, table=True):
    __tablename__ = "feedback"
    Id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    message_id: uuid.UUID = Field(foreign_key="message.Id", nullable=False)
    user_id: uuid.UUID = Field(foreign_key="user.Id", nullable=False)
    rating: int = Field(default=None, nullable=True)
    feedback_text: str = Field(default=None, nullable=True)
    feedback_selection: str = Field(default=None, nullable=True)

    message: "Message" = Relationship(back_populates="feedback")
    user: "User" = Relationship(back_populates="feedbacks")
