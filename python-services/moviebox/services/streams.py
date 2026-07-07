"""
==========================================================
NebulaOS
MovieBox Stream Service
Phase 4.4
==========================================================
"""

from ..provider import (
    Search,
    StreamFilesDetail,
)


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

    stream = StreamFilesDetail(
        session=session,
        item=item,
    )

    data = await stream.get_modelled_content(
        season=0,
        episode=0,
    )

    return {
        "id": item.subjectId,
        "title": item.title,
        "streams": [
            {
                "quality": s.resolutions,
                "codec": s.codecName,
                "format": s.format,
                "size": s.size,
                "duration": s.duration,
                "url": str(s.url),
            }
            for s in data.streams
        ],
        "best": (
            {
                "quality": data.best_stream_file.resolutions,
                "url": str(data.best_stream_file.url),
            }
            if data.best_stream_file
            else None
        ),
    }
