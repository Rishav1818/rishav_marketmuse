import json
from typing import Dict, List, Any
import time
import random

class Agent:
    def __init__(self, name: str):
        self.name = name
        
    def process_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Simulate agent processing a task with a delay"""
        print(f"{self.name} processing task: {task['query']}")
        time.sleep(random.uniform(0.5, 1.5))  # Simulate processing time
        return self._generate_response(task)
    
    def _generate_response(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a mock response based on the agent type and task"""
        if self.name == "InfluencerEvaluator":
            return {
                "agent": self.name,
                "query": task["query"],
                "response": {
                    "recommended_influencers": [
                        {
                            "name": "EcoBeautySarah",
                            "platform": "Instagram",
                            "followers": "250K",
                            "engagement_rate": "4.2%",
                            "relevance_score": 92,
                            "reason": "Strong focus on sustainable beauty products and Gen Z audience"
                        },
                        {
                            "name": "GreenGlowMaya",
                            "platform": "TikTok",
                            "followers": "500K",
                            "engagement_rate": "5.8%",
                            "relevance_score": 88,
                            "reason": "Viral sustainable skincare content with high Gen Z engagement"
                        },
                        {
                            "name": "CleanBeautyAlex",
                            "platform": "YouTube",
                            "followers": "180K",
                            "engagement_rate": "3.9%",
                            "relevance_score": 85,
                            "reason": "Detailed sustainable skincare reviews with loyal Gen Z following"
                        }
                    ],
                    "audience_insights": {
                        "gen_z_percentage": "78%",
                        "sustainability_interest": "High",
                        "beauty_engagement": "Above average"
                    }
                }
            }
        elif self.name == "CampaignPredictor":
            return {
                "agent": self.name,
                "query": task["query"],
                "response": {
                    "predicted_metrics": {
                        "reach": "1.2M - 1.5M",
                        "engagement_rate": "4.5%",
                        "conversion_rate": "2.8%",
                        "estimated_roi": "285%"
                    },
                    "confidence_score": 85,
                    "key_factors": [
                        "Strong influencer-audience alignment",
                        "Favorable market timing for sustainable products",
                        "High Gen Z interest in sustainable skincare"
                    ]
                }
            }
        elif self.name == "OptimizationStrategist":
            return {
                "agent": self.name,
                "query": task["query"],
                "response": {
                    "recommendations": [
                        "Focus on short-form video content for TikTok and Instagram Reels",
                        "Highlight sustainability certifications and eco-friendly packaging",
                        "Partner with micro-influencers for authentic product reviews",
                        "Schedule content during peak Gen Z activity hours (6-9pm)",
                        "Create a branded hashtag campaign around sustainable beauty"
                    ],
                    "budget_allocation": {
                        "influencer_payout": "60%",
                        "content_production": "20%",
                        "promotion": "20%"
                    },
                    "timeline": {
                        "pre_launch": "2 weeks",
                        "main_campaign": "8 weeks",
                        "follow_up": "4 weeks"
                    }
                }
            }
        else:
            return {"error": "Unknown agent type"}

class QueryProcessor:
    def __init__(self):
        self.agents = {
            "influencer_evaluator": Agent("InfluencerEvaluator"),
            "campaign_predictor": Agent("CampaignPredictor"),
            "optimization_strategist": Agent("OptimizationStrategist")
        }
    
    def process_query(self, query: str) -> Dict[str, Any]:
        """Process a query by decomposing it and assigning subtasks to agents"""
        # Extract key information from the query
        query_lower = query.lower()
        
        # Identify brand and product category
        brand_info = "sustainable skincare brand" if "skincare" in query_lower else "brand"
        
        # Identify target audience
        target_audience = "Gen Z" if "gen z" in query_lower else "general audience"
        
        # Create subtasks for each agent
        subtasks = [
            {
                "agent": "influencer_evaluator",
                "query": query,
                "task": f"Identify optimal influencers for {brand_info} targeting {target_audience} audiences"
            },
            {
                "agent": "campaign_predictor",
                "query": query,
                "task": f"Predict campaign outcomes for {brand_info} targeting {target_audience} audiences"
            },
            {
                "agent": "optimization_strategist",
                "query": query,
                "task": f"Recommend optimization strategies for {brand_info} campaign targeting {target_audience} audiences"
            }
        ]
        
        # Process each subtask with the appropriate agent
        agent_responses = {}
        for subtask in subtasks:
            agent_name = subtask["agent"]
            agent = self.agents[agent_name]
            response = agent.process_task(subtask)
            agent_responses[agent_name] = response
        
        # Generate a consolidated summary
        summary = self._generate_summary(agent_responses)
        
        return {
            "query": query,
            "agent_responses": agent_responses,
            "summary": summary
        }
    
    def _generate_summary(self, agent_responses: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a consolidated summary from all agent responses"""
        # Extract key information from each agent's response
        influencer_eval = agent_responses["influencer_evaluator"]["response"]
        campaign_pred = agent_responses["campaign_predictor"]["response"]
        optimization = agent_responses["optimization_strategist"]["response"]
        
        # Create a consolidated summary
        return {
            "top_influencers": [inf["name"] for inf in influencer_eval["recommended_influencers"][:2]],
            "expected_performance": {
                "reach": campaign_pred["predicted_metrics"]["reach"],
                "engagement": campaign_pred["predicted_metrics"]["engagement_rate"],
                "roi": campaign_pred["predicted_metrics"]["estimated_roi"]
            },
            "key_recommendations": optimization["recommendations"][:3],
            "confidence_score": campaign_pred["confidence_score"]
        }

# Example usage
if __name__ == "__main__":
    processor = QueryProcessor()
    example_query = "Identify the optimal influencers and predict campaign outcomes for launching a new sustainable skincare brand targeting Gen Z audiences"
    
    result = processor.process_query(example_query)
    print(json.dumps(result, indent=2)) 