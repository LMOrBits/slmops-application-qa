from typing import List
from sqlmodel import select
import uuid
from typing import Tuple
from app.shared.db.models.sqlalchemy import Chat,Message, User,Cookie
from app.shared.db.init import session_scope
from datetime import datetime,timezone

class CookiesService:
    @classmethod
    def get_user_by_cookie(cls, cookie_id: uuid.UUID) -> uuid.UUID:
        with session_scope() as session:
            statement = select(Cookie.user_id).where(Cookie.Id == cookie_id)
            return session.exec(statement).first() 
    
    @classmethod
    def create_user_by_cookie(cls) -> Tuple[uuid.UUID,uuid.UUID]:
        with session_scope() as session:
            new_user = User()
            new_cookie = Cookie(created_at=datetime.now(timezone.utc),user_id=new_user.Id)
            session.add(new_user)
            session.add(new_cookie)
            return new_user.Id,new_cookie.Id
