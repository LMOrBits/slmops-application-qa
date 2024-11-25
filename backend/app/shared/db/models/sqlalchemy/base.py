from uuid import UUID

from sqlmodel import Session, SQLModel, select

from app.shared.db.models.sqlalchemy import User
from app.shared.log.log_config import get_logger
from sqlalchemy.engine import Engine

logger = get_logger()


class SessionManager:
    _instance = None
    session = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(SessionManager, cls).__new__(cls)
        return cls._instance

    def __init__(self, engine: Engine):
        if self.session is not None:
            return

        SQLModel.metadata.create_all(engine, checkfirst=True)

        self.session = True
        logger.info("Session manager created")
        with Session(engine) as session:
            logger.info("Ensuring default user exists")
            ensure_default_user(session)
            logger.info("Default user check complete")


def ensure_default_user(session: Session):
    default_uuid = UUID(int=0)
    statement = select(User).where(User.Id == default_uuid)
    default_user_exist = session.exec(statement).first()
    logger.info(f"Default user exists: {default_user_exist is not None}")
    if default_user_exist is None:
        default_user = User(
            Id=default_uuid,  # Corrected field name to match the User model
            username="bot",
        )
        session.add(default_user)
        session.commit()  # Commit the transaction to ensure the user is saved
        logger.info("Default user created")
    else:
        logger.info("Default user already exists")
