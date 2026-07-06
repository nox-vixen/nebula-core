# Nebula MovieBox Service

## Purpose

This service is the internal streaming provider for NebulaOS.

It wraps the upstream `moviebox-api` library and exposes a stable HTTP API that Nebula Core consumes.

The frontend never communicates with this service directly.

## Architecture

User
↓
Nebula Frontend
↓
Nebula Core (Node/TypeScript)
↓
MovieBox Client
↓
Nebula MovieBox Service (Python)
↓
moviebox-api
↓
MovieBox

## Responsibilities

- Initialize moviebox-api
- Resolve movie streams
- Resolve TV episode streams
- Resolve subtitles
- Normalize errors
- Return clean JSON

## Public Status

This service is **internal**.

It is intended to be deployed separately on Render and accessed only by Nebula Core.

## Phase

Current Phase: 4.2
Status: In Development
