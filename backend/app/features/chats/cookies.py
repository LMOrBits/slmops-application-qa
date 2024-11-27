from base64 import b64encode, b64decode
import uuid
from datetime import datetime, timezone

from sqlmodel import select

from app.shared.db.init import session_scope
from app.shared.db.models.sqlalchemy import Cookie, User


class CookiesService:
    @classmethod
    def encode_cookie(cls, cookie_id: uuid.UUID) -> str:
        # return b64encode(cookie_id.bytes).decode()
        return str(cookie_id)
    
    @classmethod
    def decode_cookie(cls, cookie_encoded: str) -> uuid.UUID:
        # return uuid.UUID(bytes=b64decode(cookie_encoded))
        return uuid.UUID(cookie_encoded)

    @classmethod
    def get_user_by_cookie(cls, cookie_id: uuid.UUID) -> uuid.UUID:
        with session_scope() as session:
            statement = select(Cookie.user_id).where(Cookie.Id == cookie_id)
            return session.exec(statement).first()

    @classmethod
    def create_user_by_cookie(cls) -> tuple[uuid.UUID, uuid.UUID]:
        with session_scope() as session:
            new_user = User()
            new_cookie = Cookie(
                created_at=datetime.now(timezone.utc), user_id=new_user.Id
            )
            session.add(new_user)
            session.add(new_cookie)
            return new_user.Id, new_cookie.Id
