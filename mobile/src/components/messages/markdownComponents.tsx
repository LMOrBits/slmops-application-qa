import { Components } from 'react-markdown';
import { CodeBlock } from './Codeblock';
import { ContentTooltip } from './ContentTooltip';

export const markdownComponents: Partial<Components> = {
  code(props) {
    
    const { className, children, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");
    const isInline = !match;
    const content = String(children).replace(/\n$/, "");
    
    if (isInline) {
      return (
        <code className={className} {...rest}>
          {content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </code>
      );
    }

    const key = `code-${Math.random().toString(36).substring(2, 9)}`;
    return (
      <CodeBlock
        key={key}
        language={(match && match[1]) || ""}
        value={content}
        {...rest}
      />
    );
  },

  p(props) {
    const { children } = props;
    
    // Don't process the content, just pass it through to ContentTooltip
    // This way the think tags remain intact for ContentTooltip to process
    if (typeof children === "string") {
      return <ContentTooltip tag={"think"}>{children}</ContentTooltip>;
    }
    
    if (Array.isArray(children)) {
      // Preserve all content including think tags
      const text = children
        .map(child => (typeof child === "string" ? child : ""))
        .join("");
      
      if (text) {
        return <ContentTooltip>{text}</ContentTooltip>;
      }
    }
    
    return <p>{children}</p>;
  }
}; 