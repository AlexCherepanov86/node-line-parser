import {AutocompleteArrayInput, Filter, SearchInput} from "react-admin";
import React, {useEffect, useState} from "react";
import {baseUrl} from "../dataProvider/baseUrl";

export const ListFilters = (props) => {

    const [ filter, setFilters ] = useState([])

    useEffect(()=> {
        let newArr = []

        fetch(baseUrl + '/filter')
                .then(response => response.json())
                .then(data => {
                    data.map(item => {
                        newArr.push(item.league)
                        // console.log(newArr)
                    })
                    console.log(newArr)
                    setFilters(newArr)
                })

    }, [])
// console.log(filter)

    return(
        <Filter {...props}>
            <SearchInput source="gameid" helperText=" " placeholder="Номер" alwaysOn/>
            <AutocompleteArrayInput label="Лига" source="league" choices={filter} allowEmpty={false}/>
        </Filter>
    );
};