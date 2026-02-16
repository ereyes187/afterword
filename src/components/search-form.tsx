"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(query);
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  useEffect(() => {
    if (debounced.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);

    const fetchResults = async () => {
      const params = new URLSearchParams({
        q: debounced,
        limit: "6",
        lang: "en",
      });

      const res = await fetch(`/api/openlibrary?${params.toString()}`);
      const data = await res.json();

      setResults(data.docs);
      setLoading(false);
    };

    fetchResults();
  }, [debounced]);

  return (
    <div className="w-full max-w-lg">
      <InputGroup>
        <InputGroupInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      {!loading && results.length > 0 && (
        <ul className="mt-3 space-y-2 p-4 rounded-md border border-accent bg-card">
          {results.map((book, index) => (
            <li className="flex flex-col" key={book.key}>
              <div className="flex flex-row space-x-3 space-y-2">
                <div className="w-16 shrink-0">
                  <AspectRatio
                    ratio={2 / 3}
                    className="relative overflow-hidden rounded border border-accent"
                  >
                    <Image
                      alt={`Book cover for ${book.title} - ${book.first_publish_year}`}
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`
                          : "/not-found.jpg"
                      }
                      className="bg-accent animate-pulse transition-all data-[loaded=true]:bg-transparent data-[loaded=true]:animate-none"
                      onLoad={(event) => {
                        event.currentTarget.setAttribute("data-loaded", "true");
                      }}
                      fill
                    />
                  </AspectRatio>
                </div>
                <div className="flex flex-col">
                  <h3 className="scroll-m-20 text-lg font-semibold tracking-tight first:mt-0">
                    {book.title}
                  </h3>
                  <span className="text-muted-foreground text-sm">
                    {book.author_name?.join(", ")}
                  </span>
                </div>
              </div>
              {index !== results.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="mt-3 p-4 rounded-md border border-accent flex items-center justify-center gap-2">
          <Spinner data-icon="inline-start" />
          Searching...
        </div>
      )}
    </div>
  );
}
