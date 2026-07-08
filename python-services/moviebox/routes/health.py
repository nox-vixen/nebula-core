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
