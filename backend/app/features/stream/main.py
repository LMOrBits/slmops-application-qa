from app.shared.libs.litellm.stream import stream_text as st
from typing import List
from app.shared.libs.openai.stream import stream_text as st_openai
from app.shared.types.message import ClientMessage
from app.shared.libs.vercel.protocol import VercelStream,ToolCall,ToolCallResult,ToolCallType,Reference,ToolCallResultType
from app.shared.log.log_config import get_logger
from app.shared.libs.langchain.stream import stream_tool_call
logger = get_logger()

# stream_text = stream_tool_call

# async def stream_tool_call(messages: List[ClientMessage], protocol: str = 'data'):  
#     test = """
#       Here are some helpful resources for learning about AI and machine learning:
#     """
#     tool_call = ToolCall(toolCallId="call-456",toolName="streaming-tool",args=ToolCallResultType(type=ToolCallType.REFERENCES))
#     tool_result = ToolCallResult(result=[Reference(id=1,content=test),Reference(id=2,content="content2")])

#     for t in ["example","is","a","test"]:
#         yield VercelStream.stream_text(t)
    
#     for t in VercelStream.stream_tool_call(tool_call,tool_result):
#         yield t
        
#     yield VercelStream.stream_finish(10,20)
    

# stream_text = st_openai
stream_text = stream_tool_call    