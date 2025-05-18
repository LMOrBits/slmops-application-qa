from app.shared.log.log_config import get_logger
from app.shared.libs.app_vercel_integration.stream import stream_tool_call
from functools import partial
from app.features.qa.main import main_chain

logger = get_logger()
stream_text = partial(stream_tool_call,chain=main_chain)    