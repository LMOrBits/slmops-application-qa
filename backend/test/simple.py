from datetime import datetime

from app.features.chats import (
    ChatService,
    CookiesService,
    FeedbackService,
    MessageService,
)
from app.shared.log.log_config import get_logger

logger = get_logger()
new_user_id, new_cookie_id = CookiesService.create_user_by_cookie()
logger.info(f"{new_user_id=}")
new_chat_id = ChatService.create_chat(user_id=new_user_id, created_at=datetime.now())
logger.info(f"{new_chat_id=}")
ChatService.delete_chat(new_chat_id)
logger.info("chat deleted")
new_chat_id = ChatService.create_chat(user_id=new_user_id, created_at=datetime.now())
logger.info(f"{new_chat_id=}")

new_message_id = MessageService.create_user_message(
    chat_id=new_chat_id, user_id=new_user_id, message_text="Hello"
)
logger.info(f"{new_message_id=}")
new_bot_message_id = MessageService.create_bot_message(
    chat_id=new_chat_id, message_text="bot message"
)
logger.info(f"{new_bot_message_id=}")
new_feedback_id = FeedbackService.create_feedback(
    message_id=new_bot_message_id, rating=0, user_id=new_user_id
)
logger.info(f"{new_feedback_id=}")
new_bot_message_id = MessageService.create_bot_message(
    chat_id=new_chat_id, message_text="new bot message"
)
logger.info(f"{new_bot_message_id=}")

chats = ChatService.get_chats_ids_for_user(new_user_id)
logger.info(f"{chats=}")

messages = ChatService.get_messages_for_user_based_on_chat(new_chat_id)
logger.info(f"{messages=}")
