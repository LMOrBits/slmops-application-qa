// Referenced from Vercel's AI Chatbot and modified to fit the needs of this project
// https://github.com/vercel/ai-chatbot/blob/c2757f87f986b7f15fdf75c4c89cb2219745c53f/components/ui/codeblock.tsx

"use client";

import { FC, memo, useCallback, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import showdown from "showdown";

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { Button } from "@nextui-org/button";
import { generateId } from "ai";
import { Check, Copy, Download } from "lucide-react";

interface Props {
  language: string;
  value: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  bash: ".sh",
  jsx: ".jsx",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const converter = useMemo(
    () =>
      new showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
      }),
    []
  );

  const processedValue = useMemo(
    () => (language === "markdown" ? converter.makeHtml(value) : value),
    [language, value, converter]
  );

  const fileExtension = useMemo(
    () => programmingLanguages[language] || ".file",
    [language]
  );

  const downloadAsFile = useCallback(() => {
    if (typeof window === "undefined") return;

    const suggestedFileName = `file-${generateId()}${fileExtension}`;
    const fileName = window.prompt("Enter file name" || "", suggestedFileName);

    if (!fileName) return;

    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [fileExtension, value]);

  const onCopy = useCallback(() => {
    if (!isCopied) {
      copyToClipboard(value);
    }
  }, [copyToClipboard, isCopied, value]);

  return language === "markdown" ? (
    <div
      className="markdown-content p-4"
      dangerouslySetInnerHTML={{ __html: processedValue }}
    />
  ) : (
    <div className="relative w-full font-sans codeblock bg-foreground/5 my-8 rounded-2xl border border-foreground/25 shadow-sm">
      <div className="flex items-center justify-between w-full px-6 py-1 pr-4 bg-foreground/5 backdrop-blur-md shadow-lg rounded-t-2xl text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-1 gap-1 my-2">
          <Button
            variant="light"
            className="text-foreground/50 min-w-0 text-xs focus-visible:ring-1 w-6 h-6"
            onClick={downloadAsFile}
            isIconOnly
            startContent={<Download size={13} />}
          />
          <Button
            variant="light"
            className="text-foreground/50 min-w-0 text-xs focus-visible:ring-1 focus-visible:ring-offset-0 w-6 h-6"
            onClick={onCopy}
            isIconOnly
            startContent={isCopied ? <Check size={13} /> : <Copy size={13} />}
          />
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: "100%",
          background: "transparent",
          padding: "0.8rem 1rem",
        }}
        lineNumberStyle={{
          userSelect: "none",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono)",
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
