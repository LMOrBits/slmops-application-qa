
import asyncio
from typing import List
from app.shared.types.message import ClientMessage
from app.shared.libs.vercel.protocol import VercelStream,ToolCall,ToolCallResult,ToolCallType,Reference,ToolCallResultType
from app.shared.log.log_config import get_logger
from langchain_core.messages import BaseMessage,HumanMessage,AIMessage,SystemMessage

logger = get_logger()

def to_langchain(self) -> BaseMessage:
        if self.role == "user" or self.role == "human":
            return HumanMessage(content=self.content)
        elif self.role == "assistant" or self.role == "ai":
            return AIMessage(content=self.content)
        elif self.role == "system" or self.role == "sys":
            return SystemMessage(content=self.content)
        else:
            raise ValueError(f"Invalid role: {self.role}")

def convert_messages_to_langchain(messages: List[ClientMessage]):
    return [to_langchain(message) for message in messages]


async def stream_tool_call(messages: List[ClientMessage],chain, protocol: str = 'data'):  
  messages_langchain = convert_messages_to_langchain(messages)
  async for event , link in chain(messages_langchain , session_id="123"):
      kind = event["event"]
      if kind == "on_chat_model_stream":
          yield VercelStream.stream_text(event['data']['chunk'].content)
      if kind == "on_retriever_end":
        docs = []
        for i,doc in enumerate(event['data']['output']):
          if "markdown" in doc.metadata:
            docs.append(Reference(id=i,content=doc.metadata["markdown"]))
          else:
            docs.append(Reference(id=i,content=doc.page_content))
        tool_call = ToolCall(toolCallId=event['run_id'],toolName="streaming-tool",args=ToolCallResultType(type=ToolCallType.REFERENCES))
        tool_result = ToolCallResult(result=docs)
        for t in VercelStream.stream_tool_call(tool_call,tool_result):
            yield t 
  tool_call = ToolCall(toolCallId=event['run_id']+"-observe",toolName="streaming-tool",args=ToolCallResultType(type=ToolCallType.REFERENCES))
  tool_result = ToolCallResult(result=[Reference(id=10,content=link,link=link)])
  for t in VercelStream.stream_tool_call(tool_call,tool_result):
    yield t
  yield VercelStream.stream_finish(10,20)
    

