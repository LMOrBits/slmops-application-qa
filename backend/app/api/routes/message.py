import asyncio
import uuid
from datetime import datetime
from app.features.stream.utils.prompt import ClientMessage
from fastapi import Request,Cookie,Depends,HTTPException,Query
from fastapi.responses import JSONResponse
from app.api.utils import create_router,get_user_id
from app.features.chats import ChatService,MessageService
from app.features.stream.main import stream_text,convert_to_openai_messages
from fastapi.responses import StreamingResponse
from app.shared.log.log_config import get_logger
logger = get_logger()
router = create_router(__file__)

@router.post('/completions/{chat_id}', tags=["Message"])
async def create_message(request: Request,chat_id: str, protocol: str = Query('data'), user_id: uuid.UUID = Depends(get_user_id)):
     
    json_body = await request.json()
    messages = [ClientMessage(**message) for message in json_body['messages']]
    logger.warning(messages)
    message = messages[-1]
    MessageService.create_user_message(chat_id=chat_id,message_text=message.content,user_id=user_id)
    openai_messages = convert_to_openai_messages(messages)
    
    async def stream_generator():
        answer_cache = ""
        try:
            async for chunk,raw_chunk in stream_text(openai_messages):
                if await request.is_disconnected():
                    break
                answer_cache += raw_chunk
                yield chunk
            logger.warning(answer_cache) 
            MessageService.create_bot_message(chat_id,answer_cache)
        except asyncio.CancelledError:
            logger.info("Stream cancelled")
            pass
    
    return StreamingResponse(stream_generator(), media_type="text/plain; charset=utf-8", headers={
        "x-vercel-ai-data-stream": "v1"
    })
