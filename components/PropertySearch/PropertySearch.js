"use client";
import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { useRouter, usePathname } from "next/navigation";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 9;
    const router = useRouter();
    const pathname = usePathname();
    const category = pathname.split('/').pop();

    const search = async () => {
        const { page, minPrice, maxPrice, neuf, occasion } = queryString.parse(window.location.search);
        const filters = {
            page: parseInt(page || "1"),
            category: category,
            minPrice: minPrice ? parseInt(minPrice) : null,
            maxPrice: maxPrice ? parseInt(maxPrice) : null,
            neuf: neuf === "true",
            occasion: occasion === "true"
        };

        const response = await fetch(`/api/search`, {
            method: "POST",
            body: JSON.stringify(filters),
        });
        
        const data = await response.json();
        console.log("SEARCH DATA:", data);
        setProperties(data.properties);
        setTotalResults(data.total);
    };

    const handlePageClick = async (pageNumber) => {
        const { occasion, neuf, minPrice, maxPrice } = queryString.parse(window.location.search);

        router.push(`${pathname}?page=${pageNumber}&occasion=${occasion}&neuf=${neuf}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    };

    useEffect(() => {
        search();
    }, [category, pathname]);

    const handleSearch = async ({ occasion, neuf, minPrice, maxPrice }) => {
        router.push(`${pathname}?page=1&occasion=${occasion}&neuf=${neuf}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    };

    return (
        <div>
            <Filters onSearch={handleSearch} />
            <Results properties={properties} />
            <Pagination onPageClick={handlePageClick} totalPages={Math.ceil(totalResults / pageSize)} />
        </div>
    );
};
