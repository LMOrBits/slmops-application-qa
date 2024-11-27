import uuid

from datetime import datetime
from typing import Optional
from fastapi import HTTPException, Cookie, APIRouter, Request

from app.features.chats import CookiesService
from app.shared.log.log_config import get_logger

logger = get_logger()





def get_user_id(request: Request, session_id: Optional[str] = Cookie(None))-> uuid.UUID:
    try:
        if not session_id:
            logger.error("No session_id cookie found")
            raise HTTPException(status_code=404, detail="Please set the cookie")
        logger.info(f"session_id: {session_id}")
        cookie_id = CookiesService.decode_cookie(session_id)
        if not cookie_id:
            logger.error("No cookie_id found")
            raise HTTPException(status_code=404, detail="Please reset the cookie")
        logger.info(f"cookie_id: {cookie_id}")
        user = CookiesService.get_user_by_cookie(cookie_id)
        if not user:
            logger.error("User not found. Please reset the cookie.")
            raise HTTPException(status_code=404, detail="User not found. Please reset the cookie.")
    except Exception as e:
        logger.error(f"Error getting user_id: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    return user


def generate_session_id(email: str) -> tuple[str, datetime]:
    now = datetime.now()
    unique_string = f"{email}{now}"
    session_id = str(uuid.uuid4(uuid.NAMESPACE_DNS, unique_string))
    return session_id, now

def create_router(file_path: str) -> APIRouter:
	directory = file_path.split("/api/routes")[-1][:-3]
	router = APIRouter(prefix=directory)
	return router