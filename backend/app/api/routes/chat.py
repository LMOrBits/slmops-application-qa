import uuid
from datetime import datetime
from fastapi import Request,Depends,HTTPException
from fastapi.responses import JSONResponse
from app.api.utils import create_router,get_user_id
from app.features.chats import ChatService,MessageService
from app.shared.log.log_config import get_logger
from pydantic import BaseModel
logger = get_logger()
router = create_router(__file__)

class ChatCreateRequest(BaseModel):
    title: str
    
@router.get('', tags=["Chat"])
async def get_chats(request: Request, user_id: uuid.UUID = Depends(get_user_id)):
    chats = ChatService.get_chats_ids_for_user(user_id)
    if chats:
        response = JSONResponse(content={"chats": chats})
        return response
    
    return JSONResponse(content={"chats": []})

@router.get('/last', tags=["Chat"])
async def get_last_chat(request: Request, user_id: uuid.UUID = Depends(get_user_id)):
    chat_id = ChatService.get_last_chat_for_user(user_id)
    return {"chatId": str(chat_id)}

@router.post('', tags=["Chat"])
async def create_chat(request: Request,chat_create:ChatCreateRequest, user_id: uuid.UUID = Depends(get_user_id)):
    try:
        chat_id = ChatService.create_chat(user_id,created_at=datetime.now(),title=chat_create.title)
        MessageService.create_user_message(chat_id=chat_id,message_text=chat_create.title,user_id=user_id)
        return {"chatId": str(chat_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete('/{chat_id}', tags=["Chat"])
async def delete_chat(request: Request, chat_id: str, user_id: uuid.UUID = Depends(get_user_id)):
    try:
        ChatService.delete_chat(uuid.UUID(chat_id), user_id)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


