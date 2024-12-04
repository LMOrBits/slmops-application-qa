import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import ReactMarkdown from "react-markdown";

interface ReferencesProps {
  reference: {
    id: string;
    content: string;
  };
}

export default function References({ reference }: ReferencesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div key={reference.id}>
      <div>
        <Button
          key={reference.id}
          variant="flat"
          color="success"
          radius="md"
          onPress={onOpen}
          className="capitalize text-xs w-fit min-w-fit px-2  min-h-fit h-fit text-foreground/80"
        >
          {reference.id}
        </Button>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="w-[80dvw] max-w-[80dvw]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {reference.id}
              </ModalHeader>
              <ModalBody>
                {reference.content && (
                  <ReactMarkdown>{reference.content}</ReactMarkdown>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
