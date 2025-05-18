# import sentry_sdk
from fastapi import FastAPI,Request
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.api.routes import collect_all_routers
from app.shared.config import settings
from app.shared.log.log_config import get_logger
from pathlib import Path

logger = get_logger()




# if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
#     sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",

)

app.mount("/assets", StaticFiles(directory=Path(__file__).parents[2] / "dist" / "assets"), name="static")



# Set all CORS enabled origins
if settings.all_cors_origins:

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    

for route in collect_all_routers():
    route.routes = [r for r in route.routes if "/mock/" not in getattr(r, 'path', '')]
    app.include_router(route)

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Serve index.html for all frontend routes
    return FileResponse(Path(__file__).parents[2] / "dist" / "index.html")