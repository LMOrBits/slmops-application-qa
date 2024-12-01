import uuid
from datetime import datetime
from fastapi import Request,Cookie,Depends,HTTPException,Query
from fastapi.responses import JSONResponse
from app.api.utils import create_router,get_user_id
from app.features.chats import ChatService
from app.features.stream.main import stream_text,convert_to_openai_messages,ClientMessage
from fastapi.responses import StreamingResponse
from app.shared.log.log_config import get_logger
import asyncio
logger = get_logger()
router = create_router(__file__)


@router.get('', tags=["Chat"])
async def get_chats(request: Request, user_id: uuid.UUID = Depends(get_user_id)):
    chats = ChatService.get_chats_ids_for_user(user_id)
    if chats:
        response = JSONResponse(content={"chats": [{'id': str(chat_id),"title": str(chat_id)} for chat_id in chats]})
        return response
    
    return JSONResponse(content={"chats": []})

@router.get('/last', tags=["Chat"])
async def get_last_chat(request: Request, user_id: uuid.UUID = Depends(get_user_id)):
    chat_id = ChatService.get_last_chat_for_user(user_id)
    return {"chatId": str(chat_id)}

@router.post('', tags=["Chat"])
async def create_chat(request: Request, user_id: uuid.UUID = Depends(get_user_id)):
    try:
        chat_id = ChatService.create_chat(user_id,created_at=datetime.now())
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


