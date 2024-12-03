install:
	uv sync

dev:
	source .venv/bin/activate && fastapi dev app/api/main.py

image:
	docker build -t backend .

docker-run:
	docker run --rm -p 8000:8000 backend /bin/sh -c "trap 'exit' INT TERM; exec uvicorn app.api.main:app --host 0.0.0.0 --port 8000"

model-dep:
	docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

model-server:
	docker exec -it ollama ollama run llama2

model-start: model-dep model-server