from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from app.shared.types import ClientMessage 
from typing import List

def convert_messages_to_langchain(messages: List[ClientMessage]):
    langchain_messages = []
    for message in messages:
        if message.role == "system":
            langchain_messages.append(SystemMessage(content=message.content))
        elif message.role == "user":
            langchain_messages.append(HumanMessage(content=message.content))
        elif message.role == "ai" or message.role == "assistant":
            langchain_messages.append(AIMessage(content=message.content))
        else:
            raise ValueError(f"Unknown message type: {message.role}")
    return langchain_messages
  
  