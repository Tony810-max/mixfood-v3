import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ReserveButtonProps
  extends React.ComponentProps<typeof Button> {
    content: string;
  }

export default function ReserveButton({
  content,
  className,
  ...props
}: ReserveButtonProps) {
  return (
    <Button
      className={cn("bg-slate-500 hover:bg-slate-500 text-white hover:cursor-default", className)}
      {...props}
    >
      {content}
    </Button>
  );
}