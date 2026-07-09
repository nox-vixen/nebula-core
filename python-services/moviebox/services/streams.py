"""
==========================================================
NebulaOS
MovieBox Stream Service
Phase 4.6
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

        try:
            data = await downloads.get_content_model(subject_id)
        print("\n===== RAW DOWNLOADABLE FILES =====")
        from pprint import pprint
        for i, f in enumerate(data.list):
            print(f"\n---- Stream {i} ----")
            pprint(f.__dict__)
        except Exception as e:
            return {
                "success": False,
                "stage": "get_content_model",
                "error": str(e),
                "type": type(e).__name__,
            }

        if data is None:
            return {
                "success": False,
                "stage": "empty_response",
            }

        if not hasattr(data, "list"):
            return {
                "success": False,
                "stage": "missing_list",
                "type": str(type(data)),
                "value": repr(data),
            }

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

    best = max(streams, key=lambda s: s["quality"]) if streams else None

    return {
        "id": subject_id,
        "streams": streams,
        "best": best,
    }


async def episode_streams(
    subject_id: str,
    season: int,
    episode: int,
):
    async with MovieBoxHttpClient() as client:
        downloads = DownloadableVideoFilesDetail(
            client_session=client,
            resolution=CustomResolutionType.BEST,
        )

        data = await downloads.get_content_model(subject_id)
        print("\n===== RAW DOWNLOADABLE FILES =====")
        from pprint import pprint
        for i, f in enumerate(data.list):
            print(f"\n---- Stream {i} ----")
            pprint(f.__dict__)

        matches = [
            f
            for f in data.list
            if f.season == season and f.episode == episode
        ]

        streams = [
            {
                "title": f.title,
                "season": f.season,
                "episode": f.episode,
                "quality": int(f.resolution),
                "codec": f.codec_name,
                "size": f.size,
                "duration": f.duration,
                "url": str(f.url),
                "resourceId": f.resource_id,
            }
            for f in matches
        ]

        best = max(streams, key=lambda s: s["quality"]) if streams else None

        return {
            "id": subject_id,
            "season": season,
            "episode": episode,
            "streams": streams,
            "best": best,
        }
