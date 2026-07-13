import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
]
export default function DropdownCategory() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
