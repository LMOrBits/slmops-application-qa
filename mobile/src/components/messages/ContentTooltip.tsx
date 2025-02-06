import { memo } from 'react';
import { Tooltip } from "@heroui/tooltip";

interface ContentTooltipProps {
  children: string;
  tag?: string;  // Made optional with default value
}

export const ContentTooltip = memo(({ children, tag = "think" }: ContentTooltipProps) => {
  // Regex to match <think> ... </think>
  const regex = new RegExp(`<${tag}>([\\\s\\\S]*?)<\/${tag}>`, 'g');
  const parts = [];
  let lastIndex = 0;
  let match;
  let keyCounter = 0;

  // Convert children to string if it isn't already
  const content = String(children);

  // Loop over each <think>...</think> occurrence in the text
  while ((match = regex.exec(content)) !== null) {
    // Get the text before the current <think> block and add it as plain text
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    // match[1] contains the hidden content
    const tooltipContent = match[1].trim();
    // Show first line + ellipsis if content has multiple lines

    parts.push(
      <Tooltip key={keyCounter++} content={tooltipContent}>
        <span className="bg-muted/50 px-1 rounded cursor-help">
          {tag}
        </span>
      </Tooltip>
    );

    lastIndex = regex.lastIndex;
  }

  // Add any remaining text after the last <think> block
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return <div>{parts}</div>;
});

ContentTooltip.displayName = 'ContentTooltip';
