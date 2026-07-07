"""
==========================================================
NebulaOS
MovieBox Stream Service
Phase 4.4
==========================================================
"""

from ..provider import Search
from moviebox_api.v2.helpers import get_absolute_url


async def movie_streams(session, query: str):
    search = Search(
        session=session,
        query=query,
        page=1,
    )

    results = await search.get_content_model()

    if not results.items:
        return {"streams": []}

    item = results.items[0]

    data = await session.get_with_cookies_from_api(
        url=get_absolute_url("/wefeed-h5-bff/web/subject/play"),
        params={
            "subjectId": item.subjectId,
            "se": 0,
            "ep": 0,
        },
        headers={
            "Referer": get_absolute_url(f"/movies/{item.detailPath}")
        },
    )

    streams = data.get("streams", [])

    best = max(streams, key=lambda s: s.get("resolutions", 0), default=None)

    return {
        "id": item.subjectId,
        "title": item.title,
        "streams": [
            {
                "quality": s.get("resolutions"),
                "codec": s.get("codecName"),
                "format": s.get("format"),
                "size": s.get("size"),
                "duration": s.get("duration"),
                "url": s.get("url"),
            }
            for s in streams
        ],
        "best": (
            {
                "quality": best.get("resolutions"),
                "url": best.get("url"),
            }
            if best
            else None
        ),
    }
