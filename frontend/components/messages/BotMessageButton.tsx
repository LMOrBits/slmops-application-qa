import { useCallback, ReactNode, MouseEventHandler } from "react";
import { Button } from "@nextui-org/button";

export const BotMessageButton = ({
  startContent,
  onClick,
}: {
  startContent: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      size="sm"
      type="submit"
      radius="md"
      isIconOnly
      variant="light"
      startContent={startContent}
      onClick={onClick}
      className="  bg-none "
    />
  );
};

export default BotMessageButton;
