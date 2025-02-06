from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings
import os

import nest_asyncio
from langchain.prompts import PromptTemplate,ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from app.shared.config import settings
from langchain_core.documents import Document
import yaml
from pathlib import Path
from typing import List
from app.shared.libs.langchain.model import model,embeddings

from pydantic import BaseModel
class QA(BaseModel):
    question: str
    answer: str
    source: str
    
    def __str__(self):
        return f"**Question:** {self.question}\n**Answer:** {self.answer}"
    def markdown(self):
        return f"**Question:** {self.question}\n**Answer:** {self.answer} \n**Source:** [Link]({self.source})"
    



if settings.VECTOREDB_DIR and settings.STATUS == "MOBILE":
# if False:  
    vectorstore = Chroma(
        collection_name="demo_collection",
        embedding_function=embeddings,
        persist_directory=settings.VECTOREDB_DIR,
    )

else:
    read_qa = yaml.safe_load(open(Path(settings.RAG_DATA_DIR) / "qa.yaml" , "r"))
    qas: list[QA] = [QA(**qa,source=read_qa["source"]) for qa in read_qa["questions"]]
    #making the q and answers to markdown
    qas_metadata = [{**qa.model_dump() , "markdown":qa.markdown()} for qa in qas]
    
    import shutil
    shutil.rmtree(settings.VECTOREDB_DIR, ignore_errors=False)
    os.makedirs(settings.VECTOREDB_DIR, exist_ok=True, mode=0o777)
    os.chmod(settings.VECTOREDB_DIR, 0o777)
    vectorstore = Chroma.from_documents(
        documents=[Document(page_content=str(qa),metadata = {**qa.model_dump() , "markdown":qa.markdown()}) for qa in qas],
        embedding=embeddings,
        persist_directory=settings.VECTOREDB_DIR,
        # collection_name="qa_collection",
    )


retriever = vectorstore.as_retriever(k=8)



from langchain.retrievers.document_compressors import DocumentCompressorPipeline
from langchain_community.document_transformers import EmbeddingsRedundantFilter
from langchain.retrievers.document_compressors import EmbeddingsFilter
from langchain.retrievers.document_compressors import LLMListwiseRerank
from langchain.retrievers.document_compressors import LLMChainExtractor

from langchain_text_splitters import CharacterTextSplitter
from langchain.retrievers import ContextualCompressionRetriever

template = """Answer the question based only on the following context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

def pretty_print_docs(docs):
    answer = ""
    if docs:
        answer = (
            f"\n{'-' * 100}\n".join(
                [f"Document {i}:\n\n" + d.page_content for i, d in enumerate(docs)]
            )
        )
    else:
        answer = "No relevant documents found. \n if the question is about greeting answer it properly and if not mention you do not know the answer."
    return answer

# splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=0, separator=". ")
# from langchain_openai import ChatOpenAI
# openai_model = ChatOpenAI(model="gpt-4o-mini")
redundant_filter = EmbeddingsRedundantFilter(embeddings=embeddings)
relevant_filter = EmbeddingsFilter(embeddings=embeddings, similarity_threshold=0.7)
# compressor = LLMChainExtractor.from_llm(openai_model)
_filter = LLMListwiseRerank.from_llm(model)
pipeline_compressor = DocumentCompressorPipeline(
    transformers=[redundant_filter , relevant_filter ]
)
compression_retriever = ContextualCompressionRetriever(
    base_retriever=retriever,
    base_compressor=pipeline_compressor,
)

retrieval_chain = (
    {
        "context": compression_retriever.with_config(run_name="Docs") | 
        RunnableLambda(lambda x: pretty_print_docs(x)),
        "question": RunnablePassthrough(),
    }
    | prompt
    | model.with_config(run_name="stream")
    | StrOutputParser()
)