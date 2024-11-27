interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const UserMessage = ({ content }: MessageProps) => {
  return (
    <div className="flex w-full  justify-end">
      <div className="flex flex-col max-w-[80%] items-end">
        <p className=" text-sm bg-foreground/25 backdrop-blur-md shadow-md shadow-inner px-4 py-2 rounded-2xl">
          {content}
        </p>
      </div>
      <div className="shrink-0 rounded-full flex justify-center items-center "></div>
    </div>
  );
};
