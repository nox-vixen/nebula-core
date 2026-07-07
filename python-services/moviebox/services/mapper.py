"""
==========================================================
NebulaOS
File: services/mapper.py
Purpose: Convert MovieBox models into Nebula models
Phase: 4.3
==========================================================
"""

def _subject_type(value: int) -> str:
    mapping = {
        1: "movie",
        2: "series",
        3: "anime",
        6: "video",
    }
    return mapping.get(value, "unknown")


def map_search_results(content):
    return {
        "page": content.pager.page,
        "hasMore": content.pager.hasMore,
        "total": content.pager.totalCount,
        "results": [
            {
                "id": item.subjectId,
                "detailPath": item.detailPath,
                "title": item.title,
                "type": _subject_type(item.subjectType),
                "year": item.releaseDate.year if item.releaseDate else None,
                "rating": item.imdbRatingValue,
                "poster": item.cover.url if item.cover else None,
            }
            for item in content.items
        ],
    }
