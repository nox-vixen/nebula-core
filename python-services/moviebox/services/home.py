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
            "/wefeed-mobile-bff/tab-operating",
            params={
                "page": page,
                "tabId": TabID.ALL.value,
                "version": DEFAULT_VERSION,
            },
        )

        sections = []

        for section in data.get("items", []):

            movies = []

            # Standard subject rows
            for item in section.get("subjects") or []:

                cover = item.get("cover") or {}

                title = (item.get("title") or "").strip()
                subject_id = str(item.get("subjectId") or "")
                poster = cover.get("url")

                if (
                    not title
                    or subject_id in ("", "0")
                    or not poster
                ):
                    continue

                movies.append({
                    "id": subject_id,
                    "title": title,
                    "type": _type(item.get("subjectType")),
                    "year": (
                        int(item["releaseDate"][:4])
                        if item.get("releaseDate")
                        else None
                    ),
                    "rating": float(item.get("imdbRatingValue") or 0),
                    "poster": poster,
                })

            # Banner carousel
            banner = section.get("banner") or {}

            for item in banner.get("banners") or []:

                subject = item.get("subject") or {}
                cover = subject.get("cover") or item.get("image") or {}

                movies.append({
                    "id": item.get("subjectId"),
                    "title": subject.get("title") or item.get("content"),
                    "type": _type(subject.get("subjectType")),
                    "year": (
                        int(subject["releaseDate"][:4])
                        if subject.get("releaseDate")
                        else None
                    ),
                    "rating": float(subject.get("imdbRatingValue") or 0),
                    "poster": cover.get("url"),
                })

            # Custom rows
            custom = section.get("customData") or {}

            for item in custom.get("items") or []:

                subject = item.get("subject") or {}
                cover = subject.get("cover") or item.get("image") or {}

                movies.append({
                    "id": item.get("subjectId"),
                    "title": subject.get("title") or item.get("content"),
                    "type": _type(subject.get("subjectType")),
                    "year": (
                        int(subject["releaseDate"][:4])
                        if subject.get("releaseDate")
                        else None
                    ),
                    "rating": float(subject.get("imdbRatingValue") or 0),
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
