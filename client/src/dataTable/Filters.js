import {AutocompleteArrayInput, Filter, SearchInput} from "react-admin";
import React from "react";
import {baseUrl} from "../dataProvider/baseUrl";

export const ListFilters = (props) => {

    const FilterFetch = async () => {
        return await fetch(baseUrl + '/filter').then(response => response.json())
    }
    const filterChoice = FilterFetch().then(filter=>filter)
    console.log(filterChoice);

    return(
        <Filter {...props}>
            <SearchInput source="gameid" helperText=" " placeholder="Номер" alwaysOn/>
            <AutocompleteArrayInput label="Лига" allowEmpty={false} source="league" choices={filterChoice} />
        </Filter>
    );
};