import uuid
from datetime import datetime
from fastapi import Request,Cookie,Depends,HTTPException
from fastapi.responses import JSONResponse
from app.api.utils import create_router,get_user_id
from app.features.chats import ChatService
from app.features.stream.utils.prompt import UIMessage
router = create_router(__file__)

@router.get('/{chat_id}', tags=["Messages"])
async def get_messages(request: Request, chat_id: str, user_id: uuid.UUID = Depends(get_user_id)):
    messages = ChatService.get_messages_for_user_based_on_chat(uuid.UUID(chat_id))
    ui_messages = [UIMessage(**message).model_dump() for message in messages]
    return {"messages": ui_messages if ui_messages else []}


