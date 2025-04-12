from typing import Dict, Any, List
from agents.influencer_evaluator import InfluencerEvaluator
from agents.campaign_predictor import CampaignPredictor
from agents.optimization_strategist import OptimizationStrategist

class Orchestrator:
    def __init__(self):
        self.agents = {
            "influencer_evaluator": InfluencerEvaluator(),
            "campaign_predictor": CampaignPredictor(),
            "optimization_strategist": OptimizationStrategist()
        }

    async def process_campaign_request(self, request: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a complete campaign request by coordinating multiple agents.
        """
        # Step 1: Evaluate potential influencers
        influencer_results = await self.agents["influencer_evaluator"].process_task({
            "type": "profile_analysis",
            "name": request.get("influencer_name"),
            "platform": request.get("platform"),
            "followers": request.get("followers"),
            "engagement_rate": request.get("engagement_rate"),
            "categories": request.get("categories"),
            "target_brand": request.get("brand_name")
        })

        # Step 2: Predict campaign performance
        campaign_results = await self.agents["campaign_predictor"].process_task({
            "type": "performance_prediction",
            "brand_name": request.get("brand_name"),
            "category": request.get("product_category"),
            "target_audience": request.get("target_audience"),
            "duration": request.get("campaign_duration"),
            "budget": request.get("budget"),
            "influencer_profile": influencer_results
        })

        # Step 3: Generate optimization recommendations
        optimization_results = await self.agents["optimization_strategist"].process_task({
            "type": "campaign_optimization",
            "current_performance": campaign_results,
            "target_metrics": request.get("target_metrics"),
            "budget_constraints": request.get("budget"),
            "timeline": request.get("campaign_duration")
        })

        # Combine all results
        return {
            "influencer_evaluation": influencer_results,
            "campaign_prediction": campaign_results,
            "optimization_recommendations": optimization_results,
            "summary": {
                "recommended_influencers": self._get_recommended_influencers(influencer_results),
                "expected_performance": self._summarize_performance(campaign_results),
                "key_recommendations": self._extract_key_recommendations(optimization_results)
            }
        }

    def _get_recommended_influencers(self, results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract and format recommended influencers from evaluation results."""
        # Mock implementation - in real system would process actual data
        return [{
            "name": "Sample Influencer",
            "score": results.get("score", 0),
            "match_reasons": results.get("recommendations", [])
        }]

    def _summarize_performance(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """Summarize predicted campaign performance."""
        predictions = results.get("predictions", {})
        return {
            "expected_reach": predictions.get("expected_reach", "N/A"),
            "engagement_rate": predictions.get("engagement_rate", "N/A"),
            "conversion_rate": predictions.get("conversion_rate", "N/A"),
            "roi": predictions.get("estimated_roi", "N/A")
        }

    def _extract_key_recommendations(self, results: Dict[str, Any]) -> List[str]:
        """Extract key recommendations from optimization results."""
        optimization_plan = results.get("optimization_plan", {})
        recommendations = []
        
        # Add content strategy recommendations
        content_strategy = optimization_plan.get("content_strategy", [])
        recommendations.extend(content_strategy[:2])  # Take top 2 content recommendations
        
        # Add timing recommendations
        timing = optimization_plan.get("timing_adjustments", [])
        if timing:
            recommendations.append(timing[0])  # Take first timing recommendation
            
        return recommendations
        
    async def process_query(self, query: str) -> Dict[str, Any]:
        """
        Process a natural language query by coordinating multiple agents.
        """
        # Decompose the query into subtasks for different agents
        # In a real implementation, this would use NLP to extract entities and intent
        query_lower = query.lower()
        
        # Identify brand and product category
        brand_info = "sustainable skincare brand" if "skincare" in query_lower else "brand"
        
        # Identify target audience
        target_audience = "Gen Z" if "gen z" in query_lower else "general audience"
        
        # Create subtasks for each agent
        influencer_task = {
            "type": "profile_analysis",
            "task": f"Identify optimal influencers for {brand_info} targeting {target_audience} audiences"
        }
        
        campaign_task = {
            "type": "performance_prediction",
            "task": f"Predict campaign outcomes for {brand_info} targeting {target_audience} audiences"
        }
        
        optimization_task = {
            "type": "campaign_optimization",
            "task": f"Recommend optimization strategies for {brand_info} campaign targeting {target_audience} audiences"
        }
        
        # Process each subtask with the appropriate agent
        influencer_results = await self.agents["influencer_evaluator"].process_task(influencer_task)
        campaign_results = await self.agents["campaign_predictor"].process_task(campaign_task)
        optimization_results = await self.agents["optimization_strategist"].process_task(optimization_task)
        
        # Generate a consolidated summary
        summary = {
            "top_influencers": self._get_recommended_influencers(influencer_results),
            "expected_performance": self._summarize_performance(campaign_results),
            "key_recommendations": self._extract_key_recommendations(optimization_results)
        }
        
        return {
            "query": query,
            "agent_responses": {
                "influencer_evaluator": {
                    "agent": "InfluencerEvaluator",
                    "query": query,
                    "response": influencer_results
                },
                "campaign_predictor": {
                    "agent": "CampaignPredictor",
                    "query": query,
                    "response": campaign_results
                },
                "optimization_strategist": {
                    "agent": "OptimizationStrategist",
                    "query": query,
                    "response": optimization_results
                }
            },
            "summary": summary
        } 