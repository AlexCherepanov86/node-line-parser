import {AutocompleteArrayInput, DateInput, Filter, NumberInput, SearchInput, TextInput} from "react-admin";
import React from "react";

export const ListFilters = (props) => {

    return(
        <Filter {...props}>
            <SearchInput source="TicketNumber" helperText=" " placeholder="Номер" alwaysOn/>

        </Filter>
    );
};