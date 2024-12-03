import uuid
from datetime import datetime

from sqlmodel import select, func

from app.shared.db.init import session_scope
from app.shared.db.models.sqlalchemy import Chat, Feedback, Message
from app.shared.log.log_config import get_logger
logger = get_logger()


class ChatService:
    @classmethod
    def create_chat(cls, user_id: uuid.UUID, created_at: datetime, title:str) -> uuid.UUID:
        with session_scope() as session:
            chat = Chat(user_id=user_id, created_at=created_at,title=title)
            session.add(chat)
            return chat.Id
        
    @classmethod
    def get_last_chat_for_user(cls, user_id: uuid.UUID) -> uuid.UUID:
        with session_scope() as session:
            statement = select(Chat.Id).where(Chat.user_id == user_id).order_by(Chat.created_at.desc()).limit(1)
            return session.exec(statement).first()
    @classmethod
    def delete_all_messages_for_chat(cls, chat_id: uuid.UUID) -> bool:
        with session_scope() as session:
            statement = select(Message).where(Message.chat_id == chat_id)
            messages = session.exec(statement).all()
            for message in messages:
                session.delete(message)
            return True 

    @classmethod
    def get_chats_ids_for_user(cls, user_id: uuid.UUID) -> list[uuid.UUID]:
        with session_scope() as session:
            # First get count of messages per chat
            # Get chats with message count > 1
            # statement = (
            #     select(Chat.Id, Message)
            #     .join(Message, Message.chat_id == Chat.Id)
            #     .where(Chat.user_id == user_id)
            #     .group_by(Chat.Id, Message.Id)
            #     .having(func.count(Message.Id) > 1)
            #     .order_by(Message.created_at.asc())
            # )
            # result = session.exec(statement).all()
            # valid_chats = [{"chat_id": chat_id, "message": message} for chat_id, message in result]
            # return valid_chats
            statement = select(Chat).where(Chat.user_id == user_id).order_by(Chat.created_at.desc())
            all_chats= session.exec(statement).all()
            return [chat.export() for chat in all_chats]
    @classmethod
    def get_messages_for_user_based_on_chat(cls, chat_id: uuid.UUID):
        with session_scope() as session:
            statement = (
                select(Message)
                .outerjoin(Feedback, Feedback.message_id == Message.Id)
                .where(
                    Message.chat_id == chat_id,
                    (Feedback.rating != 0) | (Feedback.message_id == None),
                )
                .order_by(Message.created_at.asc())
            )
            return [message.export() for message in session.exec(statement).all()]

    @classmethod
    def delete_chat(cls, chat_id: uuid.UUID) -> bool:
        with session_scope() as session:
            statement = select(Chat).where(Chat.Id == chat_id)
            chat = session.exec(statement).first()
            if chat:
                session.delete(chat)
                return True
            return False
