import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group"
import { Search } from "lucide-react"


export default function SearchContent() {
    return (
        <InputGroup className="h-10 rounded-xl">
            <InputGroupInput placeholder="Search..." className="
            focus-visible:ring-offset-0 
            focus-visible:border-input" />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}
