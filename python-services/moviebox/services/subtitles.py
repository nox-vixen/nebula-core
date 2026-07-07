"""
==========================================================
NebulaOS
MovieBox Subtitle Service
Phase 4.7
==========================================================
"""

from ..provider_v3 import (
    MovieBoxHttpClient,
    DownloadableCaptionFileDetails,
)


async def subtitles(subject_id: str, resource_id: str):
    async with MovieBoxHttpClient() as client:
        captions = DownloadableCaptionFileDetails(client)

        data = await captions.get_content_model(
            subject_id,
            resource_id,
        )

        return {
            "id": subject_id,
            "resourceId": resource_id,
            "subtitles": [
                {
                    "language": s.lan,
                    "label": s.lan_name,
                    "url": str(s.url),
                    "delay": s.delay,
                    "size": s.size,
                }
                for s in data.captions
            ],
        }
