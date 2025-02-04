FROM ghcr.io/astral-sh/uv:debian-slim

WORKDIR /app

COPY . /app/

RUN uv sync

EXPOSE 80

CMD ["uv", "run", "fastapi", "run", "--host", "0.0.0.0", "--port", "80", "app/api/main.py"]
