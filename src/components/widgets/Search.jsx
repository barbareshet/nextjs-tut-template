import React from 'react';
import { BiSearch } from "react-icons/bi";
import { Input } from "@/components/ui/input";

function Search({value, onChange, defaultValue, placeHolder}) {
    return (
        <div className="relative">
            <BiSearch size={18} className="absolute left-2 top-3.5 text-color-dark"/>
            <Input
                type="search"
                placeholder={placeHolder}
                className="pl-8 text-color-dark"
                value={value}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </div>
    );
}

export default Search;