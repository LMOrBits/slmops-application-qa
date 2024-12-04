import os
import json
from typing import List
from pydantic import BaseModel

from openai import OpenAI
from app.shared.libs.openai.prompt import convert_to_openai_messages
from app.shared.log.log_config import get_logger
from app.shared.types import ClientMessage
from app.shared.libs.vercel.protocol import VercelStream,ToolCall,ToolCallResult,ToolCallType,Reference,ToolCallResultType
logger = get_logger()


client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)


class Request(BaseModel):
    messages: List[ClientMessage]

available_tools = {
    # "get_current_weather": get_current_weather,
}

import asyncio

async def stream_text(messages: List[ClientMessage], protocol: str = 'data'):
    openai_messages = convert_to_openai_messages(messages)
    draft_tool_calls = []
    draft_tool_calls_index = -1
    
    logger.info(f"messages: {messages}")
    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=openai_messages,
        stream=True,
    )

    
    test = """
Here are some helpful resources for learning about AI and machine learning:

    
    """
    result = dict(toolCallId="call-456",result=[dict(id=1,content=test) , dict(id=2,content="dfasdasf") ] )
    
    
    tool_call = ToolCall(toolCallId="call-456",toolName="streaming-tool",args=ToolCallResultType(type=ToolCallType.REFERENCES))
    tool_result = ToolCallResult(result=[Reference(id=1,content=test),Reference(id=2,content="content2")])

    for t in ["example","is","a","test"]:
        yield VercelStream.stream_text(t)
    
    for t in VercelStream.stream_tool_call(tool_call,tool_result):
        yield t
        
    yield VercelStream.stream_finish(10,20)
    
    
    for chunk in stream:
        for choice in chunk.choices:
            if choice.finish_reason == "stop":
                continue

            elif choice.finish_reason == "tool_calls":
                for tool_call in draft_tool_calls:
                    yield '9:{{"toolCallId":"{id}","toolName":"{name}","args":{args}}}\n'.format(
                        id=tool_call["id"],
                        name=tool_call["name"],
                        args=tool_call["arguments"]),None

                for tool_call in draft_tool_calls:
                    tool_result = available_tools[tool_call["name"]](
                        **json.loads(tool_call["arguments"]))

                    yield 'a:{{"toolCallId":"{id}","toolName":"{name}","args":{args},"result":{result}}}\n'.format(
                        id=tool_call["id"],
                        name=tool_call["name"],
                        args=tool_call["arguments"],
                        result=json.dumps(tool_result)),None

            elif choice.delta.tool_calls:
                for tool_call in choice.delta.tool_calls:
                    id = tool_call.id
                    name = tool_call.function.name
                    arguments = tool_call.function.arguments

                    if (id is not None):
                        draft_tool_calls_index += 1
                        draft_tool_calls.append(
                            {"id": id, "name": name, "arguments": ""})

                    else:
                        draft_tool_calls[draft_tool_calls_index]["arguments"] += arguments

            else:
                yield f'0:{json.dumps(choice.delta.content)}\n',choice.delta.content

        if chunk.choices == []:
            usage = chunk.usage
            prompt_tokens = usage.prompt_tokens
            completion_tokens = usage.completion_tokens

            yield 'e:{{"finishReason":"{reason}","usage":{{"promptTokens":{prompt},"completionTokens":{completion}}},"isContinued":false}}\n'.format(
                reason="tool-calls" if len(
                    draft_tool_calls) > 0 else "stop",
                prompt=prompt_tokens,
                completion=completion_tokens
            ),None
    
    
    
    