"use client";

import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { SendHorizontal, StopCircle } from "lucide-react";
import { type useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"];
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"];
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
    <div className="z-10 fixed bottom-0 left-0 w-full mx-auto">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full lg:max-w-[700px] sm:max-w-[100vw] xs:max-w-[100vw] flex-1 items-stretch md:flex-col">
          <div className="w-full mx-auto mb-6">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                minRows={3}
                autoFocus
                variant="faded"
                radius="full"
                onChange={handleInputChange}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                    setInput("");
                  }
                }}
                placeholder="Enter your question..."
                classNames={{
                  inputWrapper:
                    "backdrop-blur-md shadow-lg bg-foreground/5 border-1 border-foreground/10 px-4 ",
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
