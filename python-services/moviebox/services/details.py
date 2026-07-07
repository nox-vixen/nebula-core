"""
==========================================================
NebulaOS
MovieBox Details Service
Phase 4.5
MovieBox Android API (v3)
==========================================================
"""

from ..provider_v3 import (
    MovieBoxHttpClient,
    ItemDetails,
)


def _subject_type(value):
    mapping = {
        1: "movie",
        2: "series",
        3: "anime",
        6: "video",
    }
    return mapping.get(int(value), "unknown")


def map_details(item):
    subject = item.subject

    return {
        "id": subject.subject_id,
        "title": subject.title,
        "description": subject.description,
        "type": _subject_type(subject.subject_type),
        "year": subject.release_date.year if subject.release_date else None,
        "duration": subject.duration,
        "genres": subject.genre,
        "country": subject.country_name,
        "rating": subject.imdb_rating_value,
        "poster": (
            str(subject.cover.url)
            if subject.cover else None
        ),
        "detailPath": (
            str(subject.detail_url)
            if subject.detail_url else None
        ),
        "cast": [
            {
                "name": star.name,
                "character": star.character,
                "avatar": (
                    str(star.avatar.url)
                    if getattr(star, "avatar", None)
                    else None
                ),
            }
            for star in item.stars
        ],
    }


async def details(subject_id: str):
    async with MovieBoxHttpClient() as client:
        api = ItemDetails(
            client_session=client,
        )

        content = await api.get_content_model(subject_id)

    return map_details(content)
