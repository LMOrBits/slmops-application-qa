import uuid

from sqlmodel import select

from app.shared.db.init import session_scope
from app.shared.db.models.sqlalchemy import Feedback


class FeedbackService:
    @classmethod
    def create_feedback(
        cls, message_id: uuid.UUID, rating: int, user_id: uuid.UUID
    ) -> uuid.UUID:
        with session_scope() as session:
            feedback = Feedback(message_id=message_id, rating=rating, user_id=user_id)
            session.add(feedback)
            return feedback.Id

    @classmethod
    def get_feedback_by_message_id(cls, message_id: uuid.UUID):
        with session_scope() as session:
            statement = select(Feedback.id).where(Feedback.message_id == message_id)
            return session.exec(statement).first().export()
