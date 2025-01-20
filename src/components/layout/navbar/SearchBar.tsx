import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) {
  return (
    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-12">
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
          <Search className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </form>
  );
}