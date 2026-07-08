"""
==========================================================
NebulaOS
Episode Route
Phase 4.3
==========================================================
"""

from fastapi import APIRouter, HTTPException

from ..service import moviebox_service

router = APIRouter(prefix="/episode", tags=["Episode"])


@router.get("")
async def episode_list(id: str, season: int):
    details = await moviebox_service.details(id)

    seasons = details.get("seasons", [])

    season_info = next(
        (s for s in seasons if int(s["season"]) == season),
        None,
    )

    if season_info is None:
        raise HTTPException(
            status_code=404,
            detail="Season not found.",
        )

    total = int(season_info["episodes"])

    return {
        "id": id,
        "season": season,
        "totalEpisodes": total,
        "episodes": [
            {
                "episode": ep
            }
            for ep in range(1, total + 1)
        ],
    }
