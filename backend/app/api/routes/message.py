import uuid
from datetime import datetime
from fastapi import Request,Cookie,Depends,HTTPException,Query
from fastapi.responses import JSONResponse
from app.api.utils import create_router,get_user_id
from app.features.chats import ChatService,MessageService
from app.features.stream.main import stream_text,convert_to_openai_messages
from fastapi.responses import StreamingResponse
router = create_router(__file__)

@router.post('/api/chat/{chat_id}', tags=["Message"])
async def create_message(request: Request, chat_id: str,protocol: str = Query('data'), user_id: uuid.UUID = Depends(get_user_id)):
    messages = request.messages
    openai_messages = convert_to_openai_messages(messages)

    response = StreamingResponse(stream_text(openai_messages, protocol))
    response.headers['x-vercel-ai-data-stream'] = 'v1'
    return response
