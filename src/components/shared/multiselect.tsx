import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setQueryParams } from "@/redux/slices/queryParams-slice";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  name: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  name,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const dispatch = useDispatch();
  const toggleOption = (value: string) => {
    const isSelected = selected.includes(value);
    const updatedSelected = isSelected
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    onChange(updatedSelected);
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label.replace(/_/g, " "));

  const handleApply = () => {
    setOpen(false);
    const updatedQueryParams = {
      ...queryParams,
      [name]: selected,
    };
    dispatch(setQueryParams(updatedQueryParams));
  };

  const handleClear = () => {
    setOpen(false);
    const updatedQueryParams = {
      ...queryParams,
      [name]: [],
    };
    dispatch(setQueryParams(updatedQueryParams));
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          className="w-full sm:w-max justify-between lg:w-1/3 xl:w-max"
        >
          <span className="truncate capitalize">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-max p-1 space-y-1">
        {options.map((option) => (
          <Label
            key={option.value}
            htmlFor={option.value}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted cursor-pointer"
          >
            <Checkbox
              id={option.value}
              checked={selected.includes(option.value)}
              onCheckedChange={() => toggleOption(option.value)}
            />
            <span className="capitalize">
              {option.label.replace(/_/g, " ")}
            </span>
          </Label>
        ))}
        <div className="px-3 flex items-center justify-between gap-2 my-3">
          <Button variant={"outline"} onClick={handleApply}>
            Apply
          </Button>
          <Button variant={"destructive"} onClick={handleClear}>
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
