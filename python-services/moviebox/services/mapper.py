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
        "hasMore": content.pager.has_more,
        "total": content.pager.total_count,
        "results": [
            {
                "id": item.subject_id,
                "detailPath": item.detail_path,
                "title": item.title,
                "type": _subject_type(item.subject_type),
                "year": item.release_date.year if item.release_date else None,
                "rating": item.imdb_ratingValue,
                "poster": item.cover.url if item.cover else None,
            }
            for item in content.items
        ],
    }
