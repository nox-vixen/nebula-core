"""
==========================================================
NebulaOS
MovieBox Homepage Service (Raw JSON)
Phase 4.6
==========================================================
"""

from moviebox_api.v3.constants import DEFAULT_VERSION, TabID
from ..provider_v3 import MovieBoxHttpClient


def _type(value):
    try:
        value = int(getattr(value, "value", value))
    except Exception:
        return "unknown"

    return {
        1: "movie",
        2: "series",
        3: "anime",
        6: "video",
    }.get(value, "unknown")


async def home(page: int = 1):
    async with MovieBoxHttpClient() as client:

        data = await client.get_from_api(
            "/homepage",
            params={
                "page": page,
                "tabId": TabID.ALL.value,
                "version": DEFAULT_VERSION,
            },
        )

        sections = []

        for section in data.get("items", []):

            movies = []

            for item in section.get("subjects", []):

                cover = item.get("cover") or {}

                movies.append({
                    "id": item.get("subjectId"),
                    "title": item.get("title"),
                    "type": _type(item.get("subjectType")),
                    "year": (
                        int(item["releaseDate"][:4])
                        if item.get("releaseDate")
                        else None
                    ),
                    "rating": float(item.get("imdbRatingValue") or 0),
                    "poster": cover.get("url"),
                })

            sections.append({
                "title": section.get("title"),
                "type": section.get("type"),
                "items": movies,
            })

        return {
            "page": page,
            "sections": sections,
        }
