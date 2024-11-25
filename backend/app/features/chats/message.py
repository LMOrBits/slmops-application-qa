import uuid
from datetime import datetime

from app.shared.db.init import session_scope
from app.shared.db.models.sqlalchemy import Message


class MessageService:
    @classmethod
    def create_user_message(
        cls, chat_id: uuid.UUID, user_id: uuid.UUID, message_text: str
    ) -> uuid.UUID:
        with session_scope() as session:
            message = Message(
                chat_id=chat_id,
                user_id=user_id,
                message_text=message_text,
                created_at=datetime.now(),
            )
            session.add(message)
            return message.Id

    @classmethod
    def create_bot_message(cls, chat_id: uuid.UUID, message_text: str) -> uuid.UUID:
        with session_scope() as session:
            message = Message(
                chat_id=chat_id,
                user_id=uuid.UUID(int=0),
                message_text=message_text,
                created_at=datetime.now(),
            )
            session.add(message)
            return message.Id

    @classmethod
    def edit_message(cls, message_id: uuid.UUID, message_text: str) -> bool:
        with session_scope() as session:
            message = session.get(Message, message_id)
            if message:
                message.message_text = message_text
            return True
        return False
