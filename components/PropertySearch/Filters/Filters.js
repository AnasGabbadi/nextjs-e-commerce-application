import { Input } from "components/Input";
import { useEffect, useState } from "react";
import queryString from "query-string";

export const Filters = ({onSearch}) => {
    const [neuf, setNeuf] = useState(false);
    const [occasion, setOccasion] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        onSearch({
            neuf,
            occasion,
            minPrice, 
            maxPrice,
        });
    };  

    useEffect (() => {
        const {
            neuf: neufInitial,
            occasion: occasionInitial,
            minPrice: minPriceInitial,
            maxPrice: maxPriceInitial,
        } = queryString.parse(window.location.search);

        setNeuf(neufInitial === "true");
        setOccasion(occasionInitial === "true");
        setMinPrice(minPriceInitial || "");
        setMaxPrice(maxPriceInitial || "");
    }, []);

    return (
        <div className="max-w-5xl mx-auto my-5 flex gap-5 border-solid border-slate-400 border-2 p-5 rounded-md"> 
            <div className="flex-1">
                <div> 
                    <label className="cursor-pointer">
                        <input type="checkbox" checked={occasion} onChange={() => setOccasion((value) => !value)}/>
                        <span className="pl-2">Occasion</span>
                    </label>
                </div>
                <div>
                    <label className="cursor-pointer">
                        <input type="checkbox" checked={neuf} onChange={() => setNeuf((value) => !value)}/>
                        <span className="pl-2">Neuf</span>
                    </label>
                </div>
            </div>
            <div className="flex-1">
                <span>Prix minimum</span>
                <Input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
            </div>
            <div className="flex-1">
                <span>Prix maximum</span>
                <Input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
            </div>
            <div>
                <div className="btn" onClick={handleSearch}>Recherche</div>
            </div>
        </div>
    );
}