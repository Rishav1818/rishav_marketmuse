import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider, Avatar, CircularProgress, Chip } from '@mui/material';
import { AgentResponse } from '../types';

interface AgentResponsesProps {
    agentResponses: {
        [key: string]: AgentResponse;
    };
}

const AgentResponses: React.FC<AgentResponsesProps> = ({ agentResponses }) => {
    // Convert agent responses object to array for easier mapping
    const responses = Object.values(agentResponses);
    
    // State to track which agents have responded
    const [respondedAgents, setRespondedAgents] = useState<string[]>([]);
    
    // State to track which lines are visible for each agent
    const [visibleLines, setVisibleLines] = useState<{[key: string]: number[]}>({});
    
    // State to track if all agents have completed
    const [allAgentsCompleted, setAllAgentsCompleted] = useState(false);
    
    // State to track if summary is visible
    const [showSummary, setShowSummary] = useState(false);
    
    // Simulate agents responding one by one
    useEffect(() => {
        const agentTimer = setTimeout(() => {
            if (respondedAgents.length < responses.length) {
                const nextAgent = responses[respondedAgents.length].agent;
                setRespondedAgents(prev => [...prev, nextAgent]);
                setVisibleLines(prev => ({...prev, [nextAgent]: []}));
            } else {
                setAllAgentsCompleted(true);
                // Show summary after a short delay
                setTimeout(() => {
                    setShowSummary(true);
                }, 1000);
            }
        }, 2000);
        
        return () => clearTimeout(agentTimer);
    }, [respondedAgents, responses]);
    
    // Simulate text streaming for each agent
    useEffect(() => {
        if (respondedAgents.length === 0) return;
        
        const currentAgent = respondedAgents[respondedAgents.length - 1];
        const response = responses.find(r => r.agent === currentAgent);
        
        if (!response) return;
        
        // Get the number of lines for this agent
        let totalLines = 0;
        if (response.agent === "InfluencerEvaluator") {
            totalLines = 3 + (response.response.recommended_influencers?.length || 0) * 3 + 4;
        } else if (response.agent === "CampaignPredictor") {
            totalLines = 2 + 4 + 2 + 1; // Simplified line count
        } else if (response.agent === "OptimizationStrategist") {
            totalLines = 2 + (response.response.recommendations?.length || 0) + 2;
        }
        
        // If all lines are already visible, don't do anything
        if (visibleLines[currentAgent]?.length === totalLines) return;
        
        // Add a new line every 300ms
        const lineTimer = setTimeout(() => {
            setVisibleLines(prev => {
                const currentLines = prev[currentAgent] || [];
                return {
                    ...prev,
                    [currentAgent]: [...currentLines, currentLines.length]
                };
            });
        }, 300);
        
        return () => clearTimeout(lineTimer);
    }, [respondedAgents, responses, visibleLines]);
    
    // Get agent avatar color
    const getAgentColor = (agent: string) => {
        switch (agent) {
            case "InfluencerEvaluator":
                return "#4caf50"; // Green
            case "CampaignPredictor":
                return "#2196f3"; // Blue
            case "OptimizationStrategist":
                return "#ff9800"; // Orange
            default:
                return "#9e9e9e"; // Grey
        }
    };
    
    // Check if a line should be visible
    const isLineVisible = (agent: string, lineIndex: number) => {
        return visibleLines[agent]?.includes(lineIndex) || false;
    };
    
    // Generate summary from all responses
    const generateSummary = () => {
        if (!allAgentsCompleted) return null;
        
        const influencerResponse = responses.find(r => r.agent === "InfluencerEvaluator");
        const predictorResponse = responses.find(r => r.agent === "CampaignPredictor");
        const strategistResponse = responses.find(r => r.agent === "OptimizationStrategist");
        
        return {
            top_influencers: influencerResponse?.response.recommended_influencers?.map((inf: any) => inf.name) || [],
            expected_performance: {
                reach: predictorResponse?.response.predicted_metrics?.reach || "N/A",
                engagement: predictorResponse?.response.predicted_metrics?.engagement_rate || "N/A",
                roi: predictorResponse?.response.predicted_metrics?.estimated_roi || "N/A"
            },
            confidence_score: predictorResponse?.response.confidence_score || 0,
            key_recommendations: strategistResponse?.response.recommendations || []
        };
    };
    
    const summary = generateSummary();
    
    return (
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Agent Responses
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 3
            }}>
                {responses.map((response, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            display: 'flex', 
                            gap: 2,
                            opacity: respondedAgents.includes(response.agent) ? 1 : 0.5,
                            transition: 'opacity 0.5s ease-in-out'
                        }}
                    >
                        <Avatar 
                            sx={{ 
                                bgcolor: getAgentColor(response.agent),
                                width: 40,
                                height: 40
                            }}
                        >
                            {response.agent.charAt(0)}
                        </Avatar>
                        
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                                    {response.agent}
                                </Typography>
                                {!respondedAgents.includes(response.agent) && (
                                    <CircularProgress size={16} />
                                )}
                            </Box>
                            
                            {respondedAgents.includes(response.agent) ? (
                                <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.default' }}>
                                    {response.agent === "InfluencerEvaluator" && (
                                        <Box>
                                            {isLineVisible(response.agent, 0) && (
                                                <Typography variant="body1" paragraph>
                                                    Based on your campaign requirements, I recommend the following influencers:
                                                </Typography>
                                            )}
                                            
                                            <Box sx={{ mb: 2 }}>
                                                {response.response.recommended_influencers?.map((inf: any, i: number) => {
                                                    const baseIndex = 1 + i * 3;
                                                    return (
                                                        <Box key={i} sx={{ mb: 1 }}>
                                                            {isLineVisible(response.agent, baseIndex) && (
                                                                <Typography variant="body1">
                                                                    <strong>{inf.name}</strong> ({inf.platform})
                                                                </Typography>
                                                            )}
                                                            {isLineVisible(response.agent, baseIndex + 1) && (
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {inf.followers} followers, {inf.engagement_rate} engagement
                                                                </Typography>
                                                            )}
                                                            {isLineVisible(response.agent, baseIndex + 2) && (
                                                                <Typography variant="body2">
                                                                    {inf.reason}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    )}
                                    
                                    {response.agent === "CampaignPredictor" && (
                                        <Box>
                                            {isLineVisible(response.agent, 0) && (
                                                <Typography variant="body1" paragraph>
                                                    Based on the campaign parameters, I predict the following performance metrics:
                                                </Typography>
                                            )}
                                            
                                            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                                {isLineVisible(response.agent, 1) && response.response.predicted_metrics && (
                                                    <li>Reach: {response.response.predicted_metrics.reach}</li>
                                                )}
                                                {isLineVisible(response.agent, 2) && response.response.predicted_metrics && (
                                                    <li>Engagement Rate: {response.response.predicted_metrics.engagement_rate}</li>
                                                )}
                                                {isLineVisible(response.agent, 3) && response.response.predicted_metrics && (
                                                    <li>Conversion Rate: {response.response.predicted_metrics.conversion_rate}</li>
                                                )}
                                                {isLineVisible(response.agent, 4) && response.response.predicted_metrics && (
                                                    <li>Estimated ROI: {response.response.predicted_metrics.estimated_roi}</li>
                                                )}
                                            </Box>
                                            
                                            {isLineVisible(response.agent, 5) && (
                                                <Typography variant="body2" color="text.secondary">
                                                    Confidence Score: {response.response.confidence_score || 'N/A'}%
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                    
                                    {response.agent === "OptimizationStrategist" && (
                                        <Box>
                                            {isLineVisible(response.agent, 0) && (
                                                <Typography variant="body1" paragraph>
                                                    To optimize your campaign performance, I recommend:
                                                </Typography>
                                            )}
                                            
                                            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                                                {response.response.recommendations?.map((rec: string, i: number) => (
                                                    isLineVisible(response.agent, 1 + i) && (
                                                        <li key={i}>{rec}</li>
                                                    )
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </Paper>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Waiting for response...
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
            
            {showSummary && summary && (
                <Box sx={{ mt: 4 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="h5" gutterBottom>
                        Consolidated Insights Summary
                    </Typography>
                    
                    <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 3,
                        '& > *': {
                            flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
                            minWidth: { xs: '100%', md: 'calc(50% - 12px)' }
                        }
                    }}>
                        <Box>
                            <Paper elevation={2} sx={{ p: 3 }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Top Recommended Influencers
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                    {summary.top_influencers.map((influencer: string, index: number) => (
                                        <Chip 
                                            key={index} 
                                            label={influencer} 
                                            color="primary" 
                                            variant="outlined" 
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        </Box>
                        
                        <Box>
                            <Paper elevation={2} sx={{ p: 3 }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Expected Performance
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="body1">
                                        <strong>Reach:</strong> {summary.expected_performance.reach}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Engagement:</strong> {summary.expected_performance.engagement}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>ROI:</strong> {summary.expected_performance.roi}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        Confidence Score: {summary.confidence_score}%
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                        
                        <Box sx={{ width: '100%' }}>
                            <Paper elevation={2} sx={{ p: 3 }}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Key Recommendations
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <ul>
                                        {summary.key_recommendations.map((recommendation: string, index: number) => (
                                            <li key={index}>
                                                <Typography variant="body1">{recommendation}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default AgentResponses; 