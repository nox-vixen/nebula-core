"""
==========================================================
NebulaOS
MovieBox Stream Service
Deep Debug Build
==========================================================
"""

from pprint import pformat

from moviebox_api.v3.constants import CustomResolutionType
from ..provider_v3 import MovieBoxHttpClient, DownloadableVideoFilesDetail


async def movie_streams(subject_id: str):
    async with MovieBoxHttpClient() as client:
        downloads = DownloadableVideoFilesDetail(
            client_session=client,
            resolution=CustomResolutionType.BEST,
        )

        data = await downloads.get_content_model(subject_id)

        print("\n================ FULL OBJECT ================\n")
        print(pformat(vars(data), width=140))

        for name in dir(data):
            if name.startswith("_"):
                continue
            try:
                value = getattr(data, name)
                print(f"\n===== ATTRIBUTE: {name} =====")
                print(type(value))
                print(pformat(value, width=140))
            except Exception as e:
                print(name, e)

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
            "best": max(streams, key=lambda x: x["quality"]) if streams else None,
        }


async def episode_streams(subject_id: str, season: int, episode: int):
    return {
        "success": False,
        "message": "Episode debug temporarily disabled."
    }
