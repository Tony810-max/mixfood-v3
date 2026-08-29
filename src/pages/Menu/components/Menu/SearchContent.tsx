import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group"
import { useLanguage } from "@/contexts/LanguageContext"
import { Search } from "lucide-react"

interface SearchContentProps {
    onSearchChange?: (query: string) => void
}

export default function SearchContent({ onSearchChange }: SearchContentProps) {
    const { t } = useLanguage()

    return (
        <InputGroup className="h-10 rounded-xl">
            <InputGroupInput 
                placeholder={t.menuSearchPlaceholder} 
                className="focus-visible:ring-offset-0 focus-visible:border-input"
                onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
        </InputGroup>
    )
}
