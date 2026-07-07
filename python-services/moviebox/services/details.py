"""
==========================================================
NebulaOS
MovieBox Details Service
Phase 4.3
==========================================================
"""

from ..provider import ItemDetails


def map_details(item):
    subject = item.subject

    return {
        "id": subject.subjectId,
        "title": subject.title,
        "description": subject.description,
        "type": (
            "movie" if str(subject.subjectType) == "1"
            else "series" if str(subject.subjectType) == "2"
            else "anime" if str(subject.subjectType) == "3"
            else "video" if str(subject.subjectType) == "5"
            else "unknown"
        ),
        "year": subject.releaseDate.year if subject.releaseDate else None,
        "duration": subject.duration,
        "genres": subject.genre,
        "country": subject.countryName,
        "rating": subject.imdbRatingValue,
        "poster": (
            str(subject.cover.url)
            if subject.cover and getattr(subject.cover, "url", None)
            else None
        ),
        "detailPath": subject.detailPath,
        "cast": [
            {
                "name": star.name,
                "character": star.character,
                "avatar": str(star.avatarUrl),
            }
            for star in item.stars
        ],
    }


async def details(session, detail_path: str):
    client = ItemDetails(session=session)

    content = await client.get_content_model(detail_path)

    return map_details(content)
