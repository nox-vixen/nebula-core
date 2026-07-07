"""
==========================================================
NebulaOS
MovieBox Stream Service
Phase 4.5
Android API (v3)
==========================================================
"""

from moviebox_api.v3.constants import CustomResolutionType
from ..provider_v3 import (
    MovieBoxHttpClient,
    Search,
    DownloadableVideoFilesDetail,
)


async def movie_streams(query: str):
    async with MovieBoxHttpClient() as client:
        search = Search(
            client_session=client,
            query=query,
            page=1,
        )

        results = await search.get_content_model()

        if not results.items:
            return {"streams": []}

        movie = results.items[0]

        downloads = DownloadableVideoFilesDetail(
            client_session=client,
            resolution=CustomResolutionType.BEST,
        )

        data = await downloads.get_content_model(
            subject_id=movie.subject_id,
            release_date=str(movie.release_date),
        )

        streams = [
            {
                "title": f.title,
                "quality": int(f.resolution),
                "codec": f.codec_name,
                "size": f.size,
                "duration": f.duration,
                "url": str(f.url),
                "resourceId": f.resource_id,
            }
            for f in data.list
        ]

        return {
            "id": movie.subject_id,
            "title": movie.title,
            "streams": streams,
            "best": (
                {
                    "quality": int(data.best_media_file.resolution),
                    "url": str(data.best_media_file.url),
                }
                if streams
                else None
            ),
        }
