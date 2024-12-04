import importlib.util
import os

from app.shared.log.log_config import get_logger

logger = get_logger()


def load_router_from_file(file_path, collected_routes: list):
    """Check if a file is a Python module with a 'router' attribute and add it to collected_routes."""
    if file_path.endswith(".py") and not file_path.endswith("__init__.py"):
        module_name = os.path.splitext(os.path.basename(file_path))[0]
        spec = importlib.util.spec_from_file_location(module_name, file_path)
        module = importlib.util.module_from_spec(spec)
        try:
            spec.loader.exec_module(module)
            if hasattr(module, "router"):
                collected_routes.append(module.router)
        except Exception as error:
            logger.error(f"Failed to load module {module} {module_name}: {error}")


def collect_all_routers():
    """Recursively collect all routers from Python files in the specified directory."""
    directory = os.path.dirname(__file__)
    # target_directory = os.path.join(current_directory, directory)
    target_directory = directory
    collected_routes = []
    for file in os.listdir(target_directory):
        if file.startswith("_"):
            continue
        file_path = os.path.join(target_directory, file)
        if os.path.isdir(file_path):
            collect_all_routers(os.path.join(directory, file))
        else:
            logger.info(
                f"Retrieving routers from: api{file_path.split(directory)[1]}"
            )
            load_router_from_file(file_path, collected_routes)
    return collected_routes
