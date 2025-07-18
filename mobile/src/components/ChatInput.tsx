import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { SendHorizontal, StopCircle } from "lucide-react";
import { type useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"] | (() => void);
type SetInput = ReturnType<typeof useChat>["setInput"];
type Stop = ReturnType<typeof useChat>["stop"];
type IsLoading = ReturnType<typeof useChat>["isLoading"];
interface ChatInputProps {
  input: string;
  handleInputChange: HandleInputChange;
  handleSubmit: HandleSubmit;
  setInput: SetInput;
  stop: Stop;
  isLoading: IsLoading;
}

export const ChatInput = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
  stop,
  isLoading,
}: ChatInputProps) => {
  return (
    <div className="sticky z-10 bottom-0 2xl:px-[10vw] xl:px-[10vw] lg:px-[10vw] md:px-[20px] px-[12px] w-full mx-auto">
      <div className="fixed z-9 bottom-0 w-full h-16 bg-background"></div>
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full px-[20px] flex-1 items-stretch md:flex-col">
          <div className="w-full mx-auto mb-6">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                minRows={3}
                autoFocus
                variant="faded"
                radius="full"
                onChange={handleInputChange}
                value={input}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit();
                    setInput("");
                  }
                }}
                placeholder="Enter your question..."
                classNames={{
                  inputWrapper:
                    "backdrop-blur-md shadow-lg bg-foreground/5  border-foreground/10 px-4 ",
                }}
              />

              <AnimatePresence>
                <div className="absolute z-10 right-2 bottom-0 flex flex-row">
                  {input.trim() && (
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 5, opacity: 0 }}
                      transition={{
                        type: "ease-out",
                        duration: 0.2,
                        delay: 0.1,
                      }}
                      className=""
                    >
                      <Button
                        size="sm"
                        type="submit"
                        radius="full"
                        isIconOnly
                        variant="light"
                        startContent={
                          <SendHorizontal className="size-7 text-foreground" />
                        }
                        className="px-2 bg-none"
                      />
                    </motion.div>
                  )}
                  {stop && isLoading && (
                    <motion.div
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 5, opacity: 0 }}
                      transition={{
                        type: "ease-in-out",
                        duration: 0.5,
                        delay: 0.5,
                      }}
                      className=""
                    >
                      <Button
                        size="sm"
                        radius="full"
                        isIconOnly
                        variant="light"
                        onClick={stop}
                        startContent={
                          <StopCircle className="size-7 text-foreground" />
                        }
                      />
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
