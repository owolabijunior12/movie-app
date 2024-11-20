'use client';

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <div className="flex w-screen justify-center items-center">
       <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border w-[8 0%] border-gray-500 rounded-lg"
    />
    </div>
     
  );
}
