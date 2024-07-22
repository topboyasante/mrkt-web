"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearchClick = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex gap-5 items-center">
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background text-muted-foreground pl-8 md:w-[200px] lg:w-[320px]"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        />
      </div>
      <Button onClick={handleSearchClick} variant={`secondary`}>
        Search
      </Button>
    </div>
  );
}
