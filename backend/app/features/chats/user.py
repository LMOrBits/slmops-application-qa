
from app.shared.db.init import session_scope
from app.shared.db.models.sqlalchemy import User


class UserService:
    @classmethod
    def create_user(cls, cookie: str) -> User:
        with session_scope() as session:
            user = User(cookie=cookie)
            session.add(user)
            return user
