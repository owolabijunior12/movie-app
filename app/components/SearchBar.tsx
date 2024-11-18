'use client';

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
      <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-2 border border-gray-500 rounded-lg"
    />
  );
}
