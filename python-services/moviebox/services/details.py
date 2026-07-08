"""
==========================================================
NebulaOS
MovieBox Details Service
Phase 4.5
MovieBox Android v3
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
    return {
        "id": item.subject_id,
        "title": item.title,
        "description": item.description,
        "type": _subject_type(item.subject_type),
        "year": item.release_date.year if item.release_date else None,
        "duration": item.duration,
        "genres": item.genre,
        "country": item.country_name,
        "rating": item.imdb_rating_value,
        "poster": str(item.cover.url) if item.cover else None,
        "detailPath": str(item.detail_url) if item.detail_url else None,
        "cast": [
            {
                "name": staff.name,
                "character": getattr(staff, "character", None),
                "avatar": str(staff.avatar.url) if getattr(staff, "avatar", None) else None,
            }
            for staff in item.staff_list
        ],
        "seasons": (
            [
                {
                    "season": season.season_number,
                    "episodes": season.total_episodes,
                    "maxResolution": int(season.best_resolution.resolution),
                }
                for season in item.seasons.seasons
            ]
            if item.seasons
            else []
        ),
    }


async def details(subject_id: str):
    async with MovieBoxHttpClient() as client:
        api = ItemDetails(
            client_session=client,
            include_seasons=True,
        )
        content = await api.get_content_model(subject_id)

        print("========== RAW ITEM ==========")
        print(vars(content))

    return map_details(content)
