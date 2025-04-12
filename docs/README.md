# MarketMuse Documentation

## Overview
MarketMuse is an AI-driven marketing intelligence system that leverages multiple specialized agents to provide comprehensive insights for influencer marketing campaigns. The system processes natural language queries about marketing campaigns and provides detailed analysis, predictions, and recommendations.

## Documentation Structure

1. [System Architecture](./architecture.md)
   - High-level system design
   - Component interactions
   - Data flow
   - Visual diagrams

2. [Agent Design](./agents.md)
   - Agent personas and responsibilities
   - Prompt engineering
   - Agent interactions
   - Response formats

3. [Query Processing](./query-processing.md)
   - Query decomposition
   - Routing logic
   - Response aggregation
   - Flow diagrams

4. [Technical Implementation](./implementation.md)
   - Backend implementation
   - Frontend implementation
   - API design
   - Data structures

5. [Rationale and Decisions](./rationale.md)
   - Design decisions
   - Architecture choices
   - Technology selection
   - Future considerations

## Quick Start

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   python api/main.py
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Access the application at `http://localhost:3000`

## Example Usage

Submit a marketing query like:
"Identify the optimal influencers and predict campaign outcomes for launching a new sustainable skincare brand targeting Gen Z audiences"

The system will:
1. Decompose the query into subtasks
2. Route tasks to specialized agents
3. Process responses in parallel
4. Aggregate insights
5. Present a comprehensive analysis

## Contributing

Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 