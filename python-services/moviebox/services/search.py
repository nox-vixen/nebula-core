"""
==========================================================
NebulaOS
File: services/search.py
Purpose: MovieBox Search Service (v3)
Phase: 4.5
==========================================================
"""

from ..provider_v3 import (
    MovieBoxHttpClient,
    Search,
)

from .mapper import map_search_results


async def search(query: str, page: int = 1):
    async with MovieBoxHttpClient() as client:
        search_client = Search(
            client_session=client,
            query=query,
            page=page,
        )

        content = await search_client.get_content_model()

    return map_search_results(content)
