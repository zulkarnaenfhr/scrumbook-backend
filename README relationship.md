                         ┌──────────────┐
                         │    users     │
                         │──────────────│
                         │ id PK        │
                         │ username     │
                         │ email        │
                         └──────┬───────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
       organization     organization_member    project
              │                 │                 │
              │                 │                 │
              │                 │          ┌──────┴─────────┐
              │                 │          │                │
              │                 │          ▼                ▼
              │                 │      timeline         document
              │                 │          │
              │                 │          ▼
              │                 │         task
              │                 │
              │                 └────────────────────
              │
              ▼
          project
              │
      ┌───────┼────────┬────────────┬─────────────┐
      ▼       ▼        ▼            ▼             ▼

timeline document flow changelog project_constraint
│
▼
task

project
│
└── corresponding_team
