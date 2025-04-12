# Query Processing in MarketMuse

## Query Processing Overview

MarketMuse processes marketing queries through a sophisticated pipeline that breaks down complex questions into specialized subtasks, routes them to appropriate agents, and aggregates the responses into actionable insights.

## Query Decomposition

### 1. Query Analysis
```mermaid
graph TD
    A[Raw Query] --> B[Query Parser]
    B --> C[Entity Extraction]
    C --> D[Intent Classification]
    D --> E[Task Generation]
    E --> F[Agent Assignment]
```

### 2. Entity Extraction
```mermaid
graph LR
    subgraph Entities
        A[Brand Info] --> A1[Name]
        A[Brand Info] --> A2[Category]
        A[Brand Info] --> A3[Target Audience]
        
        B[Campaign Info] --> B1[Duration]
        B[Campaign Info] --> B2[Budget]
        B[Campaign Info] --> B3[Goals]
        
        C[Influencer Info] --> C1[Platform]
        C[Influencer Info] --> C2[Metrics]
        C[Influencer Info] --> C3[Categories]
    end
```

## Routing Logic

### 1. Task Distribution
```mermaid
graph TB
    subgraph Task Router
        A[Query] --> B{Task Type}
        B -->|Influencer Analysis| C[Influencer Evaluator]
        B -->|Performance Prediction| D[Campaign Predictor]
        B -->|Strategy Optimization| E[Optimization Strategist]
    end
```

### 2. Agent Selection
```mermaid
graph LR
    subgraph Selection Criteria
        A[Task Type] --> B[Agent Expertise]
        B --> C[Current Load]
        C --> D[Response Time]
        D --> E[Agent Selection]
    end
```

## Response Aggregation

### 1. Data Collection
```mermaid
graph TD
    A[Agent Responses] --> B[Response Validator]
    B --> C[Data Normalizer]
    C --> D[Conflict Resolver]
    D --> E[Aggregated Data]
```

### 2. Insight Generation
```mermaid
graph LR
    subgraph Insight Pipeline
        A[Raw Data] --> B[Pattern Recognition]
        B --> C[Trend Analysis]
        C --> D[Recommendation Generation]
        D --> E[Final Insights]
    end
```

## Example Query Flow

### 1. Sample Query
"Identify the optimal influencers and predict campaign outcomes for launching a new sustainable skincare brand targeting Gen Z audiences"

### 2. Decomposition Process
```mermaid
graph TD
    A[Original Query] --> B[Entity Extraction]
    B --> C1[Brand: sustainable skincare]
    B --> C2[Audience: Gen Z]
    B --> C3[Goal: launch campaign]
    
    C1 --> D[Task Generation]
    C2 --> D
    C3 --> D
    
    D --> E1[Influencer Analysis]
    D --> E2[Campaign Prediction]
    D --> E3[Strategy Optimization]
```

### 3. Task Assignment
```mermaid
graph LR
    subgraph Tasks
        A[Influencer Analysis] --> B[Find sustainable beauty influencers]
        A --> C[Evaluate Gen Z appeal]
        A --> D[Assess platform fit]
        
        E[Campaign Prediction] --> F[Estimate reach]
        E --> G[Predict engagement]
        E --> H[Calculate ROI]
        
        I[Strategy Optimization] --> J[Content strategy]
        I --> K[Budget allocation]
        I --> L[Timeline planning]
    end
```

## Response Processing

### 1. Data Validation
```typescript
interface ValidationRules {
    influencerResponse: {
        required: ['name', 'platform', 'followers', 'engagement_rate'],
        optional: ['relevance_score', 'reason']
    },
    campaignResponse: {
        required: ['reach', 'engagement_rate', 'conversion_rate'],
        optional: ['estimated_roi', 'confidence_score']
    },
    strategyResponse: {
        required: ['recommendations'],
        optional: ['budget_allocation', 'timeline']
    }
}
```

### 2. Conflict Resolution
```mermaid
graph TD
    A[Conflicting Data] --> B{Conflict Type}
    B -->|Metric Discrepancy| C[Statistical Analysis]
    B -->|Recommendation Conflict| D[Expert Review]
    B -->|Timeline Conflict| E[Priority Assessment]
    
    C --> F[Resolution]
    D --> F
    E --> F
```

## Implementation Details

### 1. Query Processing Pipeline
```python
def process_query(query: str) -> Dict[str, Any]:
    # 1. Extract entities
    entities = extract_entities(query)
    
    # 2. Generate tasks
    tasks = generate_tasks(entities)
    
    # 3. Assign to agents
    agent_tasks = assign_tasks(tasks)
    
    # 4. Process responses
    responses = process_responses(agent_tasks)
    
    # 5. Generate summary
    summary = generate_summary(responses)
    
    return {
        "query": query,
        "agent_responses": responses,
        "summary": summary
    }
```

### 2. Response Aggregation
```python
def aggregate_responses(responses: List[Dict[str, Any]]) -> Dict[str, Any]:
    # 1. Validate responses
    validated = validate_responses(responses)
    
    # 2. Normalize data
    normalized = normalize_data(validated)
    
    # 3. Resolve conflicts
    resolved = resolve_conflicts(normalized)
    
    # 4. Generate insights
    insights = generate_insights(resolved)
    
    return insights
```

## Error Handling

### 1. Query Processing Errors
```mermaid
graph TD
    A[Error Detection] --> B{Error Type}
    B -->|Invalid Query| C[Request Clarification]
    B -->|Missing Entities| D[Default Values]
    B -->|Processing Error| E[Fallback Response]
    
    C --> F[Error Recovery]
    D --> F
    E --> F
```

### 2. Response Handling
```mermaid
graph LR
    subgraph Error Recovery
        A[Error] --> B[Log Error]
        B --> C[Generate Fallback]
        C --> D[Notify User]
        D --> E[Continue Processing]
    end
```

## Performance Optimization

### 1. Parallel Processing
```mermaid
graph TD
    A[Query] --> B[Task Splitter]
    B --> C1[Agent 1]
    B --> C2[Agent 2]
    B --> C3[Agent 3]
    C1 --> D[Response Aggregator]
    C2 --> D
    C3 --> D
    D --> E[Final Response]
```

### 2. Caching Strategy
```mermaid
graph LR
    subgraph Cache Flow
        A[Request] --> B{Cache Hit?}
        B -->|Yes| C[Return Cached]
        B -->|No| D[Process Query]
        D --> E[Cache Result]
        E --> F[Return Response]
    end
``` 