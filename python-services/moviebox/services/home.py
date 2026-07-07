from moviebox_api.v3.constants import TabID
from ..provider_v3 import MovieBoxHttpClient, Homepage


def _type(v):
    try:
        v = int(v)
    except Exception:
        try:
            v = int(getattr(v, "value"))
        except Exception:
            return "unknown"

    return {
        1: "movie",
        2: "series",
        3: "anime",
        6: "video",
    }.get(v, "unknown")


async def home(page: int = 1):
    async with MovieBoxHttpClient() as client:
        api = Homepage(
            client_session=client,
            page_number=page,
            tab_id=TabID.ALL,
        )

        data = await api.get_content_model()

        sections = []

        for section in data.items:
            subjects = []

            for item in section.subjects:
                subjects.append({
                    "id": item.subject_id,
                    "title": item.title,
                    "type": _type(item.subject_type),
                    "year": item.release_date.year if item.release_date else None,
                    "rating": float(item.imdb_rating_value or 0),
                    "poster": str(item.cover.url) if item.cover else None,
                })

            sections.append({
                "title": section.title,
                "type": section.type,
                "items": subjects,
            })

        return {
            "page": page,
            "sections": sections,
        }
