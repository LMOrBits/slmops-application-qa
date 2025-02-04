import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import ReactMarkdown from "react-markdown";

export interface ReferencesProps {
  title: string;
  content: string;
}

export default function References({ reference }: { reference: ReferencesProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div key={reference.title}>
      <div>
        <Button
          key={reference.title}
          variant="flat"
          color="success"
          radius="md"
          onPress={onOpen}
          className="capitalize text-xs w-fit min-w-fit px-2  min-h-fit h-fit text-foreground/80"
        >
          {reference.title}
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
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {reference.title}
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
