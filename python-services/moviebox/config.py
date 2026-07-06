"""
==========================================================
NebulaOS
File: config.py
Purpose: MovieBox Service Configuration
Phase: 4.2
==========================================================
"""

import os


class Settings:
    SERVICE_NAME = "Nebula MovieBox Service"
    SERVICE_VERSION = "0.1.0"

    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))

    LOG_LEVEL = os.getenv("LOG_LEVEL", "info")

    MOVIEBOX_TIMEOUT = int(
        os.getenv("MOVIEBOX_TIMEOUT", "10")
    )

    CACHE_TTL = int(
        os.getenv("MOVIEBOX_CACHE_TTL", "300")
    )


settings = Settings()
