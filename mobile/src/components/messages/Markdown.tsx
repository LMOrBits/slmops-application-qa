import { FC, memo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

export const MemoizedReactMarkdown: FC<Options> = memo(
  ({ children, className, ...props }) => (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={className} {...props}>
      {children}
    </ReactMarkdown>
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

export const preprocessLaTeX = (content: string) => {
  const blockProcessedContent = content.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (_, equation) => `$$${equation}$$`
  );
  const inlineProcessedContent = blockProcessedContent.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (_, equation) => `$${equation}$`
  );
  return inlineProcessedContent;
};

export default { MemoizedReactMarkdown, preprocessLaTeX };
