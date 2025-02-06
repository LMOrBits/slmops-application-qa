from app.shared.libs.litellm.stream import stream_text as st
from typing import List
from app.shared.libs.openai.stream import stream_text as st_openai
from app.shared.log.log_config import get_logger
from app.shared.libs.langchain.stream import stream_tool_call
from functools import partial
from app.features.qa.main import main_chain

logger = get_logger()
stream_text = partial(stream_tool_call,chain=main_chain)    