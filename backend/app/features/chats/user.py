from typing import List
from sqlmodel import select
import uuid

from app.shared.db.models.sqlalchemy import Chat,Message, Feedback, User
from app.shared.db.init import session_scope


class UserService:
    @classmethod
    def create_user(cls, cookie: str) -> User:
        with session_scope() as session:
            user = User(cookie=cookie)
            session.add(user)
            return user
