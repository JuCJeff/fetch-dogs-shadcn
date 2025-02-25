import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { SortOption } from "@/types";

interface SortOptionProps {
  selectedSortOption: string;
  onSortOptionChange: (sort: SortOption) => void;
}

const SORT_OPTIONS = [
  { param: "breed:asc", name: "Breed A-Z" },
  { param: "breed:desc", name: "Breed Z-A" },
  { param: "name:asc", name: "Name A-Z" },
  { param: "name:desc", name: "Name Z-A" },
  { param: "age:asc", name: "Youngest to Oldest" },
  { param: "age:desc", name: "Oldest to Youngest" },
];

const SortOptions = ({
  selectedSortOption,
  onSortOptionChange,
}: SortOptionProps) => {
  return (
    <Select
      value={selectedSortOption}
      onValueChange={(value) => onSortOptionChange(value as SortOption)}
    >
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Sort Options" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Options</SelectLabel>
          {SORT_OPTIONS.map(({ param, name }) => (
            <SelectItem key={param} value={param}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortOptions;
