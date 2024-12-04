
from typing import List
from app.shared.types.message import ClientMessage
from app.shared.libs.vercel.protocol import VercelStream,ToolCall,ToolCallResult,ToolCallType,Reference,ToolCallResultType
from app.shared.log.log_config import get_logger
from app.shared.libs.langchain.qa import retrieval_chain
from app.shared.libs.langchain.utils import convert_messages_to_langchain
logger = get_logger()

async def stream_tool_call(messages: List[ClientMessage], protocol: str = 'data'):  
  langchain_messages = convert_messages_to_langchain(messages)
  async for event in retrieval_chain.astream_events(messages[-1].content, version="v2"):
      kind = event["event"]
      if kind == "on_chat_model_stream":
          yield VercelStream.stream_text(event['data']['chunk'].content)
      if kind == "on_retriever_end":
        docs = []
        for i,doc in enumerate(event['data']['output']):
          docs.append(Reference(id=i,content=doc.page_content))
        tool_call = ToolCall(toolCallId=event['run_id'],toolName="streaming-tool",args=ToolCallResultType(type=ToolCallType.REFERENCES))
        tool_result = ToolCallResult(result=docs)
        for t in VercelStream.stream_tool_call(tool_call,tool_result):
            yield t
          
  yield VercelStream.stream_finish(10,20)
    

