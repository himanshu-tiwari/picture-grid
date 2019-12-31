import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { PictureContext } from '../../contexts/PictureContext';
import { searchPictures, loadMorePictures } from '../../queries/pictures';
import { Select, Icon } from 'antd';
import { isNonEmptyArray, isNonEmptyString, isJsonParsable } from '../../helpers/checks';

const { Option } = Select;

const SearchBar = props => {
    const { loading, dispatch, text, photos } = useContext(PictureContext);
    
    const [searchText, setSearchText] = useState(text);
    const [searches, setSearches] = useState(
        isJsonParsable(window.localStorage.getItem("searches")) &&
        isNonEmptyArray(JSON.parse(window.localStorage.getItem("searches")))
        ? JSON.parse(window.localStorage.getItem("searches"))
        : []
    );

    useEffect(() => {
        if (isNonEmptyString(searchText)) {
            dispatch({ type: 'BEGIN_SEARCH' });
            searchPictures(dispatch, { text: searchText });
        }
    }, [searchText]);

    useEffect(() => {
        window.localStorage.setItem("searches", JSON.stringify(searches));
    }, [searches]);

    const handleChange = (value, save) => {
        if (isNonEmptyString(value)) {
            setSearchText(value);
        } else {
            setSearchText("");
        }

        if (save === true) {
            if (isNonEmptyString(value)) {
                setSearches([...new Set([
                    value,
                    ...searches
                ])]);
            } else {
                dispatch({ type: "RESET_STATE" });
            }
        }
    }

    return <div className="search-bar">
        <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onSelect={value => handleChange(value, true)}
            onBlur={value => handleChange(value, true)}
            onSearch={handleChange}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            dropdownClassName={`searches ${
                !(isNonEmptyArray(searches) || isNonEmptyString(searchText)) && "hidden"
            }`}
            value={searchText}
            suffixIcon={<Icon type="search" />}
        >{
            isNonEmptyString(searchText)
            ? [...new Set([ searchText, ...searches ])].map(search => <Option
                key={search}
                value={search}
            >{ search }</Option>)
            : searches.map(search => <Option key={search} value={search}>{ search }</Option>)
        }</Select>
    </div>;
};

export default SearchBar;