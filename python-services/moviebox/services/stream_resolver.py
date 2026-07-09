"""
==========================================================
NebulaOS
File: stream_resolver.py
Purpose: Direct H5 stream resolver for MovieBox
Phase: 4.4
==========================================================
"""

import json
import re
import httpx

API_BASE = "https://h5-api.aoneroom.com/wefeed-h5api-bff"

_DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://moviebox.ph/",
    "Origin": "https://moviebox.ph",
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Client-Info": '{"timezone":"Asia/Dhaka"}',
    "X-Request-Lang": "en",
}

_PLAYER_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "X-Client-Info": '{"timezone":"Asia/Dhaka"}',
}

_bearer = None


async def _guest_token():
    global _bearer

    if _bearer:
        return _bearer

    async with httpx.AsyncClient(timeout=25, follow_redirects=True) as client:
        r = await client.get(
            f"{API_BASE}/home?host=moviebox.ph",
            headers=_DEFAULT_HEADERS,
        )

        xu = r.headers.get("x-user")

        if xu:
            try:
                _bearer = json.loads(xu)["token"]
            except Exception:
                pass

        if not _bearer:
            cookie = r.headers.get("set-cookie", "")
            m = re.search(r"token=([^;]+)", cookie)
            if m:
                _bearer = m.group(1)

    return _bearer or ""


async def _request(url, method="GET", payload=None):
    token = await _guest_token()

    headers = {
        **_DEFAULT_HEADERS,
        "Authorization": f"Bearer {token}" if token else "",
    }

    async with httpx.AsyncClient(timeout=25, follow_redirects=True) as client:

        if method == "POST":
            r = await client.post(url, headers=headers, json=payload)
        else:
            r = await client.get(url, headers=headers)

        xu = r.headers.get("x-user")

        if xu:
            try:
                global _bearer
                _bearer = json.loads(xu)["token"]
            except Exception:
                pass

        r.raise_for_status()

        return r.json()


async def resolve_movie(subject_id: str, detail_path: str):

    dom = await _request(f"{API_BASE}/media-player/get-domain")

    domain = dom["data"]["domain"]

    referer = (
        f"{domain}/spa/videoPlayPage/movies/"
        f"{detail_path}"
        f"?id={subject_id}"
        f"&type=/movie/detail"
        f"&detailSe=1"
        f"&detailEp=1"
        f"&lang=en"
    )

    play_url = (
        f"{domain}/wefeed-h5api-bff/subject/play"
        f"?subjectId={subject_id}"
        f"&se=1"
        f"&ep=1"
        f"&detailPath={detail_path}"
    )

    async with httpx.AsyncClient(timeout=25, follow_redirects=True) as client:

        r = await client.get(
            play_url,
            headers={
                **_PLAYER_HEADERS,
                "Referer": referer,
            },
        )

        r.raise_for_status()

        data = r.json().get("data", {})

    return data
