1. Database connection
        ↓
2. Base Response + Error handling
        ↓
3. Users
        ↓
4. Organizations
        ↓
5. Organization Members
        ↓
6. Projects
        ↓
7. Timeline
        ↓
8. Tasks
        ↓
9. Documents
        ↓
10. Flow
        ↓
11. Changelog
        ↓
12. Project Constraints
        ↓
13. Corresponding Teams
        ↓
14. Access
        ↓
15. Authentication / Authorization

## Logging

Service-level debug logging is enabled through `src/utils/logger.ts`.

Set the log level in `.env`:

```env
LOG_LEVEL=debug
```

Available levels:
- `debug` — service entry points and repository operations
- `info` — application/server lifecycle events
- `warn` — warnings
- `error` — errors

Sensitive fields such as passwords, tokens, secrets, and authorization values are automatically redacted by the logger.
