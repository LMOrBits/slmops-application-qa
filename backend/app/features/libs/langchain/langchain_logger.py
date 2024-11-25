# from typing import Any, Dict, List
# from langchain_core.callbacks import BaseCallbackHandler
# from langchain_core.outputs import LLMResult
# import time
# import logging

# class TimingLogger(BaseCallbackHandler):
#     def __init__(self,logger ) -> None:
#         super().__init__()
#         self.logger = logger
#         self.timers = {}

#     def _start_timer(self, tag: str) -> None:
#         self.timers[tag] = time.perf_counter()

#     def _end_timer(self, tag: str) -> float:
#         if tag in self.timers:
#             elapsed = time.perf_counter() - self.timers[tag]
#             del self.timers[tag]
#             return elapsed
#         return 0.0

#     # def on_chain_start(
#     #     self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
#     # ) -> None:
#     #     chain_name = serialized.get("name", "unnamed_chain")
#     #     self._start_timer(f"chain_{kwargs.get('run_id', chain_name)}")
#     #     self.logger.info(f"Chain '{chain_name}' started")

#     # def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> None:
#     #     chain_name = kwargs.get("run_id", "unnamed_chain")
#     #     elapsed = self._end_timer(f"chain_{chain_name}")
#     #     self.logger.log("TIME",f"Chain '{chain_name}' completed in {elapsed:.2f} seconds")

#     def on_llm_start(
#         self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
#     ) -> None:

#         llm_name = serialized.get("name", "unnamed_llm")
#         self._start_timer(f"llm_{kwargs.get('run_id', llm_name)}")
#         self.logger.info(f"LLM '{kwargs.get('tags', [])[-1]}' started")

#     def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
#         llm_name = kwargs.get("run_id", "unnamed_llm")
#         elapsed = self._end_timer(f"llm_{llm_name}")
#         self.logger.log("TIME",f"LLM '{kwargs.get('tags', [])[-1]}' completed in {elapsed:.2f} seconds")

#     @classmethod
#     def generate_callback_with_tag(cls, logger,tag:str):
#         handler_instance = cls(logger)
#         return {"callbacks": [handler_instance], "tags": [tag]}
