"""
==========================================================
NebulaOS
File: services.py
Purpose: MovieBox Service Facade
Phase: 4.2
==========================================================
"""

from .config import settings
from .provider import Session

from .services.search import search


class MovieBoxService:
    """Nebula facade around the upstream moviebox-api."""

    def __init__(self):
        self.session = Session(
            timeout=settings.MOVIEBOX_TIMEOUT
        )

    async def health(self):
        return {
            "healthy": True,
            "provider": "moviebox"
        }

    async def search(self, query: str, page: int = 1):
        return await search(
            session=self.session,
            query=query,
            page=page,
        )

    async def get_movie_streams(self, movie_id: str):
        raise NotImplementedError("Movie stream resolution not implemented.")

    async def get_episode_streams(
        self,
        series_id: str,
        season: int,
        episode: int,
    ):
        raise NotImplementedError("Episode stream resolution not implemented.")

    async def get_subtitles(self, media_id: str):
        raise NotImplementedError("Subtitle resolution not implemented.")


moviebox_service = MovieBoxService()
