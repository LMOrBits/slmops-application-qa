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
  id: string;
  content: string;
  link?: string;
}

export default function References({
  reference,
}: {
  reference: ReferencesProps;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (reference.link) {
    return <ReferencesLink reference={reference} />;
  }
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
        className="w-[80dvw] max-w-[80dvw] p-[3rem]"
      >
        <ModalContent>
          {() => (
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

function ReferencesLink({ reference }: { reference: ReferencesProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div key={reference.id}>
      <div>
        <Button
          key={reference.id}
          variant="shadow"
          color="primary"
          radius="sm"
          onPress={onOpen}
          className="capitalize text-xs w-fit min-w-fit px-2 min-h-fit h-fit "
        >
          observation
        </Button>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="w-[90dvw] max-w-[90dvw] p-[3rem]"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Observation
              </ModalHeader>
              <ModalBody>
                <iframe
                  src={reference.link}
                  className="w-[70dvw] h-[70dvh]"
                ></iframe>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
