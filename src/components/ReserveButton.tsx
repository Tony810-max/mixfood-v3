import { cn } from "@/lib/utils";
import { ROUTES } from "@/utils/const";
import { Link } from "react-router-dom";
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
    <Link to={ROUTES.BOOKING}>
      <Button
        className={cn("bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white", className)}
        {...props}
      >
        {content}
      </Button>
    </Link>
  );
}