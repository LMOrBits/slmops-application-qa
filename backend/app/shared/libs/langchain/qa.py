from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings

from langchain_openai import ChatOpenAI
import nest_asyncio
from langchain.prompts import PromptTemplate,ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableLambda 
model = ChatOpenAI(model="gpt-4o-mini")

template = """Answer the question based only on the following context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)

vectorstore = Chroma.from_texts(
    ["harrison worked at kensho", "harrison likes spicy food" , "harrison is a good person", "harrison is a bad person"],
    embedding=OpenAIEmbeddings(),
)
retriever = vectorstore.as_retriever()

chunks = [chunk for chunk in retriever.stream("where did harrison work?")]

retrieval_chain = (
    {
        "context": retriever.with_config(run_name="Docs"),
        "question": RunnablePassthrough(),
    }
    | prompt
    | model
    | StrOutputParser()
)