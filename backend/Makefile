install:
	uv sync

dev:
	source .venv/bin/activate && fastapi dev app/api/main.py --host 0.0.0.0 --port 80


image:
	docker build -t slm-app .

docker-run:
	docker run --rm -d --network host -p 80:80 --name slm-app-container -v "/Users/parsa/Desk/projects/dev-tmp/test-app/slmops-application-qa/backend/app/shared/db/backup:/app/app/shared/db/backup" slm-app && docker logs -f slm-app-container


run: image docker-run

stop:
	docker stop slm-app-container

model-start: model-dep model-server