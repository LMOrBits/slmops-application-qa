from typing import Optional

from fastapi import Request,Cookie
from fastapi.responses import JSONResponse
from app.api.utils import create_router
from app.features.chats import CookiesService  
from app.shared.log.log_config import get_logger

logger = get_logger()

router = create_router(__file__)


@router.get('', tags=["Cookie"])
async def get_cookie(request: Request, session_id: Optional[str] = Cookie(None)):
    if session_id is None:
        _ , new_cookie_id = CookiesService.create_user_by_cookie()
        cookie_encoded = CookiesService.encode_cookie(new_cookie_id)
        response = JSONResponse(content={"message": "Welcome new user!","cookie": cookie_encoded})
        response.set_cookie(key="session_id", value=str(cookie_encoded))
        logger.info(f"New cookie created: {cookie_encoded}")
    else:
        try:
            cookie_id = CookiesService.decode_cookie(session_id)
            user_id = CookiesService.get_user_by_cookie(cookie_id)

            if user_id:
                response = JSONResponse(
                    content={
                        "message": f"Welcome back! Your user ID is {user_id}",
                    "user_id": str(user_id),
                    "cookie": session_id
                }
            )
        except Exception as e:
            logger.error(f" {session_id=} {type(session_id)=} {session_id[0]=}")
            logger.error(f"Cookie does not match database. Please remove your cookie. {session_id} {e}")
            # response = JSONResponse(
            #     content={"message": "Cookie does not match database. Please remove your cookie."}
            # )
            _ , new_cookie_id = CookiesService.create_user_by_cookie()
            cookie_encoded = CookiesService.encode_cookie(new_cookie_id)
            response = JSONResponse(content={"message": "Welcome new user!","cookie": cookie_encoded})
            response.set_cookie(key="session_id", value=str(cookie_encoded))
            logger.info(f"New cookie created: {cookie_encoded}")
    return response


