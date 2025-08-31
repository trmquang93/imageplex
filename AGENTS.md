# MUST following workflow:

```mermaid
flowchart TD
    A[Start Task] --> B{Memory Bank Loaded?}
    B -->|No| C[Load Memory Bank Files]
    B -->|Yes| D[Apply 100% Understanding Rule]
    C --> D
    D --> E{Complex Task?}
    E -->|Yes| F[Use Sub-agents]
    E -->|No| G[Follow TDD: Red-Green-Refactor]
    F --> G
    G --> H[Apply Premium Standards]
    H --> I[Complete Task]
    I --> J{Task Complete?}
    J -->|Yes| K[Check Memory Bank Update Needed]
    J -->|No| G
    K --> L{Significant Changes/Insights?}
    L -->|Yes| M[Update Memory Bank]
    L -->|No| N[End]
    M --> N
```

# Sub-agents usage
- You should use sub-agents to handle each user request.
- Each sub-agent should be focused on a specific task or module.
- Sub-agents help maintain focus and provide better results for complex tasks
- **ENFORCE**: Always use sub-agents when possible, especially for:
  - File analysis and code examination
  - Implementation of new features or bug fixes
  - Code modifications and updates
  - Research tasks across multiple files
  - Complex problem-solving that requires multiple steps