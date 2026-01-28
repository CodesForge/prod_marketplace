"""Application logging configuration.

Configures the root logger format and exposes a module-level logger instance.
"""
import logging


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    encoding="utf-8"
)

logger = logging.getLogger(__name__)
"""Module logger instance to be imported and used across the application."""
