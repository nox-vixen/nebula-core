"""
==========================================================
NebulaOS
File: services.py
Purpose: MovieBox Service Facade
Phase: 4.2
==========================================================
"""

from .config import settings

from .services.search import search
from .services.details import details
from .services.streams import movie_streams


class MovieBoxService:
    """Nebula facade around the upstream moviebox-api."""

    def __init__(self):
        pass

    async def health(self):
        return {
            "healthy": True,
            "provider": "moviebox"
        }

    async def search(self, query: str, page: int = 1):
        return await search(
            query=query,
            page=page,
        )

    async def details(self, detail_path: str):
        return await details(
            session=self.session,
            detail_path=detail_path,
        )


    async def movie_streams(self, query: str):
        return await movie_streams(query)

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
