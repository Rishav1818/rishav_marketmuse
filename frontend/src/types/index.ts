export interface AgentResponse {
    agent: string;
    query: string;
    response: {
        recommended_influencers?: Array<{
            name: string;
            platform: string;
            followers: string;
            engagement_rate: string;
            relevance_score: number;
            reason: string;
        }>;
        predicted_metrics?: {
            reach: string;
            engagement_rate: string;
            conversion_rate: string;
            estimated_roi: string;
        };
        recommendations?: string[];
        confidence_score?: number;
        key_factors?: string[];
        budget_allocation?: {
            [key: string]: string;
        };
        timeline?: {
            [key: string]: string;
        };
    };
}

export interface QueryResponse {
    query: string;
    agent_responses: {
        [key: string]: AgentResponse;
    };
    summary: {
        top_influencers: string[];
        expected_performance: {
            reach: string;
            engagement: string;
            roi: string;
        };
        key_recommendations: string[];
        confidence_score: number;
    };
} 