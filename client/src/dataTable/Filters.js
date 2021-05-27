import {AutocompleteArrayInput, Filter, SearchInput} from "react-admin";
import React, {useEffect, useState} from "react";
import {baseUrl} from "../dataProvider/baseUrl";

export const ListFilters = (props) => {

    const [ filter, setFilters ] = useState([])

    useEffect(()=> {
        fetch(baseUrl + '/filter')
                .then(response => response.json())
                .then(data => {
                    setFilters(data)
                })

    }, [])
// console.log(filter)

    return(
        <Filter {...props}>
            <SearchInput source="gameid" helperText=" " placeholder="Номер" alwaysOn/>
            <AutocompleteArrayInput label="Лига" source="league" choices={filter.league} allowEmpty={false}/>
            <AutocompleteArrayInput label="команда1" source="t1" choices={filter.team1} allowEmpty={false}/>
            <AutocompleteArrayInput label="команда2" source="t2" choices={filter.team2} allowEmpty={false}/>
        </Filter>
    );
};