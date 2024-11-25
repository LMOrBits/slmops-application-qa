from typing import List
from sqlmodel import select
import uuid
from datetime import datetime
from app.shared.db.models.sqlalchemy import Chat,Message, Feedback, User
from app.shared.db.init import session_scope


class ChatService:

    @classmethod
    def create_chat(cls, user_id: uuid.UUID, created_at: datetime) -> uuid.UUID:
        with session_scope() as session:
            chat = Chat(user_id=user_id, created_at=created_at)
            session.add(chat)
            return chat.Id

    @classmethod
    def get_chats_ids_for_user(cls, user_id: uuid.UUID) -> List[uuid.UUID]:
        with session_scope() as session:
            statement = select(Chat.Id).where(Chat.user_id == user_id)
            return  session.exec(statement).all()
        
    @classmethod
    def get_messages_for_user_based_on_chat(cls, chat_id: uuid.UUID):
        with session_scope() as session:
            # need to join with feedback table and if the rate is not 0 then show the message
            statement = select(Message).outerjoin(Feedback, Feedback.message_id == Message.Id).where(
                Message.chat_id == chat_id,
                (Feedback.rating != 0) | (Feedback.message_id == None)
            ).order_by(Message.created_at.asc())
            return [message.export() for message in session.exec(statement).all()]
        
    @classmethod
    def delete_chat(cls, chat_id: uuid.UUID) -> None:
        with session_scope() as session:
            session.delete(Chat,chat_id)
