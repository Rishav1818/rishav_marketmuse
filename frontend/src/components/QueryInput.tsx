import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { processQuery } from '../services/api';
import { QueryResponse } from '../types';
import AgentResponses from './AgentResponses';
const QueryInput: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<QueryResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const response = await processQuery(query);
            setResult(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    MarketMuse - AI-Driven Marketing Intelligence
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Enter your marketing query to get AI-powered insights
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Marketing Query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Example: Identify the optimal influencers and predict campaign outcomes for launching a new sustainable skincare brand targeting Gen Z audiences"
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading || !query.trim()}
                            sx={{ minWidth: 200 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Process Query'}
                        </Button>
                    </Box>
                </form>
                
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Paper>
            
            {result && (
                <>
                    <AgentResponses agentResponses={result.agent_responses} />
                </>
            )}
        </Box>
    );
};

export default QueryInput; 