"""
==========================================================
NebulaOS
File: routes/health.py
Purpose: Health Routes
Phase: 4.2
==========================================================
"""

from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health():
    return {
        "healthy": True,
        "provider": "moviebox",
        "service": "Nebula MovieBox Service",
        "version": "0.1.0",
        "phase": "4.2"
    }


@router.get("/inspect-core")
async def inspect_core():
    import moviebox_api.v3.core as core
    return {
        "exports": sorted(
            x for x in dir(core)
            if not x.startswith("_")
        )
    }


@router.get("/inspect-season")
async def inspect_season():
    import inspect
    from moviebox_api.v3.core import SeasonDetails

    return {
        "signature": str(inspect.signature(SeasonDetails)),
        "methods": sorted(
            name for name, obj in inspect.getmembers(SeasonDetails)
            if callable(obj) and not name.startswith("_")
        ),
        "attributes": sorted(
            name for name in dir(SeasonDetails)
            if not callable(getattr(SeasonDetails, name))
            and not name.startswith("_")
        )
    }


@router.get("/inspect-season-method")
async def inspect_season_method():
    import inspect
    from moviebox_api.v3.core import SeasonDetails

    return {
        "get_content_model": str(inspect.signature(SeasonDetails.get_content_model)),
        "get_content": str(inspect.signature(SeasonDetails.get_content)),
    }


@router.get("/dump-season-model")
async def dump_season_model():
    from pprint import pformat
    from moviebox_api.v3.http_client import MovieBoxHttpClient
    from moviebox_api.v3.core import SeasonDetails

    async with MovieBoxHttpClient() as client:
        api = SeasonDetails(client)
        model = await api.get_content_model("6207982430134357800")

    return {
        "type": str(type(model)),
        "repr": pformat(model.__dict__)
    }


@router.get("/inspect-paths")
async def inspect_paths():
    from moviebox_api.v3.core import (
        SEARCH_PATH,
        SEARCH_PATH_V2,
        SUBJECT_GET_PATH,
        SEASON_INFO_PATH,
        RESOURCE_PATH,
        EXT_CAPTIONS_PATH,
        MAIN_PAGE_PATH,
    )

    return {
        "SEARCH_PATH": SEARCH_PATH,
        "SEARCH_PATH_V2": SEARCH_PATH_V2,
        "SUBJECT_GET_PATH": SUBJECT_GET_PATH,
        "SEASON_INFO_PATH": SEASON_INFO_PATH,
        "RESOURCE_PATH": RESOURCE_PATH,
        "EXT_CAPTIONS_PATH": EXT_CAPTIONS_PATH,
        "MAIN_PAGE_PATH": MAIN_PAGE_PATH,
    }


@router.get("/inspect-season-source")
async def inspect_season_source():
    import inspect
    from moviebox_api.v3.core import SeasonDetails

    return {
        "source": inspect.getsource(SeasonDetails)
    }


@router.get("/dump-season-raw")
async def dump_season_raw():
    from moviebox_api.v3.http_client import MovieBoxHttpClient
    from moviebox_api.v3.core import SeasonDetails

    async with MovieBoxHttpClient() as client:
        api = SeasonDetails(client)
        data = await api.get_content("6207982430134357800")

    return data
