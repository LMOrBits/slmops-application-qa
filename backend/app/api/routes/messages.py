import uuid
from datetime import datetime
from fastapi import Request,Cookie,Depends,HTTPException
from fastapi.responses import JSONResponse
from app.api.utils import create_router,get_user_id
from app.features.chats import ChatService

router = create_router(__file__)

@router.get('/{chat_id}', tags=["Messages"])
async def get_messages(request: Request, chat_id: str, user_id: uuid.UUID = Depends(get_user_id)):
    messages = ChatService.get_messages_for_user_based_on_chat(chat_id)
    return {"messages": messages if messages else []}


