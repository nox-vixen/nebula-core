"""
==========================================================
NebulaOS
File: services/search.py
Purpose: MovieBox Search Service
Phase: 4.2
==========================================================
"""

from ..provider import Search
from .mapper import map_search_results


async def search(session, query: str, page: int = 1):
    """
    Execute a MovieBox search.

    NOTE:
    This is currently the Nebula wrapper around the upstream API.
    Response normalization into Nebula's universal models will be
    implemented in the next milestone.
    """

    search_client = Search(
        session=session,
        query=query,
        page=page,
    )

    content = await search_client.get_content_model()

    return map_search_results(content)
