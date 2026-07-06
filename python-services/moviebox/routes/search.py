"""
==========================================================
NebulaOS
File: routes.py
Purpose: MovieBox API Routes
Phase: 4.2
==========================================================
"""

from fastapi import APIRouter, Query

from ..service import moviebox_service

router = APIRouter()


@router.get("/health")
async def health():
    return await moviebox_service.health()


@router.get("/search")
async def search(
    query: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
):
    return await moviebox_service.search(
        query=query,
        page=page,
    )
