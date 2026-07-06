"""
==========================================================
NebulaOS
File: models.py
Purpose: Internal MovieBox Service Models
Phase: 4.2
==========================================================
"""

from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Stream:
    url: str
    quality: str
    format: str
    provider: str = "moviebox"


@dataclass
class Subtitle:
    language: str
    url: str
    format: Optional[str] = None
    default: bool = False
    forced: bool = False


@dataclass
class HealthStatus:
    healthy: bool
    provider: str
    version: str
