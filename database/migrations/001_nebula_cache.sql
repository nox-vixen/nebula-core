create table if not exists nebula_cache (
    key text primary key,

    value jsonb not null,

    version integer not null default 1,

    tags text[] not null default '{}',

    ttl integer not null,

    created_at timestamptz not null,

    updated_at timestamptz not null,

    expires_at timestamptz not null
);

create index if not exists idx_nebula_cache_expires
on nebula_cache (expires_at);

create index if not exists idx_nebula_cache_tags
on nebula_cache
using gin(tags);
