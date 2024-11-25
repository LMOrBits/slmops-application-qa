from uuid import UUID
from app.shared.config import settings
from contextlib import contextmanager
from sqlmodel import create_engine ,Session
from app.shared.db.models.sqlalchemy import SessionManager
from app.shared.log.log_config import get_logger
logger = get_logger()

logger.info(f"Connecting to database: {settings.SQLALCHEMY_DATABASE_URI}")
engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))
logger.info("Database connected")
SessionManager(engine)
logger.info("Session manager created")
@contextmanager

def session_scope():
	session = Session(engine)
	try:
		yield session
		session.commit()
	except Exception as e:
		logger.error(e)
		session.rollback()
		raise
	finally:
		session.close()

