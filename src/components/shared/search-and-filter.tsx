import React from "react";
import { Input } from "../ui/input";
import { MultiSelect } from "./multiselect";
import { ENUM_TASK_PRIORITY, ENUM_TASK_STATUS } from "@/types";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setQueryParams } from "@/redux/slices/queryParams-slice";
import type { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AllProjects from "../projects/all-projects";

type Props = {
  disabled?: string[];
};
function SearchAndFilter({ disabled }: Props) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [priority, setPriority] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setQueryParams({ ...queryParams, searchTerm }));
  };

  const isHidden = (name: string) => disabled?.includes(name);

  return (
    <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-2 mb-5">
      {!isHidden("search") && (
        <div className="flex border rounded-md w-full md:max-w-sm lg:max-w-full xl:max-w-sm">
          <Input
            className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search tasks..."
            value={searchTerm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Button
            onClick={handleSearch}
            size={"lg"}
            className="rounded-tl-none rounded-bl-none"
          >
            <Search />
          </Button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {!isHidden("status") && (
          <MultiSelect
            options={Object.values(ENUM_TASK_STATUS).map((tech) => ({
              label: tech,
              value: tech,
            }))}
            selected={selected}
            onChange={setSelected}
            placeholder="Select Status"
            name="status"
          />
        )}
        {!isHidden("priority") && (
          <MultiSelect
            options={Object.values(ENUM_TASK_PRIORITY).map((tech) => ({
              label: tech,
              value: tech,
            }))}
            selected={priority}
            onChange={setPriority}
            placeholder="Select Priority"
            name="priority"
          />
        )}
        {!isHidden("category") && (
          <Select
            onValueChange={(value) => {
              if (value === "all") {
                dispatch(
                  setQueryParams({ ...queryParams, category: undefined })
                );
              } else {
                dispatch(setQueryParams({ ...queryParams, category: value }));
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-max lg:w-1/3 xl:w-max">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <AllProjects />
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}

export default SearchAndFilter;
