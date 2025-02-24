import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { US_STATES, RADIUS_OPTIONS } from "@/data";

type LocationFilterProps = {
  city: string | undefined;
  setCity: (city: string) => void;
  state: string | undefined;
  setState: (state: string) => void;
  radius: string | undefined;
  setRadius: (radius: string | undefined) => void;
  onFilter: () => void;
};

const LocationFilter = ({
  city,
  setCity,
  state,
  setState,
  radius,
  setRadius,
  onFilter,
}: LocationFilterProps) => {
  return (
    <div className="flex flex-col justify-center items-center my-1 gap-1 md:flex-row md:gap-0">
      <Input
        type="string"
        value={city || ""}
        placeholder="City"
        onChange={(e) => setCity(e.target.value)}
        className="w-[120px] md:w-[240px]"
      />

      <Select value={state || ""} onValueChange={(value) => setState(value)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>States</SelectLabel>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={radius || ""}
        onValueChange={(value) => setRadius(value || undefined)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Radius" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Radius</SelectLabel>
            {RADIUS_OPTIONS.map((radius) => (
              <SelectItem key={radius.toString()} value={radius.toString()}>
                {radius} miles
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={onFilter}>Apply Location Filter</Button>
    </div>
  );
};

export default LocationFilter;
