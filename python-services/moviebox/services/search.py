"""
==========================================================
NebulaOS
File: services/search.py
Purpose: MovieBox Search Service
Phase: 4.2
==========================================================
"""

from ..provider import Search


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

    return await search_client.get_content_model()
