"""
==========================================================
NebulaOS
MovieBox Stream Service
Phase 4.4
==========================================================
"""

from .stream_resolver import resolve_movie


async def movie_streams(subject_id: str, provider_ref: str | None = None):
    """
    Resolve movie streams using the new H5 resolver.
    Returns the same normalized structure expected by Nebula Core.
    """

    data = await resolve_movie(subject_id, provider_ref or "")

    files = (
        data.get("playList")
        or data.get("playListV2")
        or data.get("list")
        or []
    )

    streams = []

    for f in files:
        url = (
            f.get("url")
            or f.get("playUrl")
            or f.get("file")
            or f.get("src")
        )

        if not url:
            continue

        streams.append({
            "title": f.get("title"),
            "quality": int(
                f.get("resolution")
                or f.get("quality")
                or 0
            ),
            "codec": f.get("codec"),
            "size": f.get("size"),
            "duration": f.get("duration"),
            "url": url,
            "resourceId": (
                f.get("resourceId")
                or f.get("resource_id")
            ),
        })

    streams.sort(
        key=lambda x: x["quality"],
        reverse=True,
    )

    return {
        "id": subject_id,
        "streams": streams,
        "best": streams[0] if streams else None,
    }


async def episode_streams(subject_id: str, season: int, episode: int):
    return {
        "success": False,
        "message": "Episode resolver migration is next."
    }
