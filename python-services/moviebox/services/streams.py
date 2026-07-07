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
    DownloadableVideoFilesDetail,
)


async def movie_streams(subject_id: str):
    async with MovieBoxHttpClient() as client:
        downloads = DownloadableVideoFilesDetail(
            client_session=client,
            resolution=CustomResolutionType.BEST,
        )

        data = await downloads.get_content_model(subject_id)

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
            "id": subject_id,
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
