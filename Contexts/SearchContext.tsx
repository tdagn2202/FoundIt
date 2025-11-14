import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context state
interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

// Create the context with a default value
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component with proper types for children
export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};
