import asyncio
import uuid

from fastapi.responses import StreamingResponse
from fastapi import Request,Depends,Query

from app.api.utils import create_router,get_user_id
from app.features.chats import MessageService
from app.features.stream.main import stream_text
from app.shared.log.log_config import get_logger
from app.shared.types import ClientMessage

logger = get_logger()
router = create_router(__file__)


@router.post('/completions/{chat_id}', tags=["Message"])
async def create_message(request: Request,chat_id: str, protocol: str = Query('data'), user_id: uuid.UUID = Depends(get_user_id)):
    chat_id = uuid.UUID(chat_id)
    json_body = await request.json()
    messages = [ClientMessage(**message) for message in json_body['messages']]
    need_to_add_user_message = len(messages)>1
    message = messages[-1]
    logger.log("DEV",message)
    if message.role == "user":
        if need_to_add_user_message:
            MessageService.create_user_message(chat_id=chat_id,message_text=message.content,user_id=user_id)
        # openai_messages = convert_to_openai_messages(messages)
        
        async def stream_generator():
            answer_cache = ""
            try:
                async for chunk,raw_chunk in stream_text([message]):
                    if await request.is_disconnected():
                        break
                    if type(raw_chunk) == str:
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
