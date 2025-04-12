from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseAgent(ABC):
    def __init__(self, name: str):
        self.name = name
        self.system_prompt = self._get_system_prompt()
        self.task_prompts = self._get_task_prompts()

    @abstractmethod
    def _get_system_prompt(self) -> str:
        """Return the system-level prompt for this agent."""
        pass

    @abstractmethod
    def _get_task_prompts(self) -> Dict[str, str]:
        """Return the task-level prompts for this agent."""
        pass

    @abstractmethod
    async def process_task(self, task: Dict[str, Any]) -> Dict[str, Any]:
        """Process a task and return the results."""
        pass

    def _format_prompt(self, prompt_template: str, **kwargs) -> str:
        """Format a prompt template with the provided kwargs."""
        return prompt_template.format(**kwargs) 