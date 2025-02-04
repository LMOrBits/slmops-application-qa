from langchain_community.chat_models import ChatLiteLLM
from langchain_openai import ChatOpenAI
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings


# model = ChatOpenAI(model="gpt-4o-mini")
# embeddings = OpenAIEmbeddings(model="text-embedding-3-large")


# model = ChatLiteLLM(model="lm_studio/llama-3.2-3b-instruct",
#                     api_base="http://127.0.0.1:1234/v1/",
#                     stream=True,
#                     temperature=0.0,
#                     verbose=True,
#                     )

model = ChatLiteLLM(
                    stream=True,
                    temperature=0.5,
                    verbose=True,
                    model="openai/custom",               
                    api_key="none",                  
                    api_base="http://localhost:8080/v1",   
                    )


embeddings = FastEmbedEmbeddings()
