import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { PictureContext } from '../../contexts/PictureContext';
import { searchPictures, loadMorePictures } from '../../queries/pictures';

const SearchBar = props => {
    const { loading, dispatch, text, photos } = useContext(PictureContext);
    
    useEffect(() => {
        // dispatch({ type: 'BEGIN_SEARCH' });
        // searchPictures(dispatch, { text: "car" });
        
        dispatch({ type: 'BEGIN_LOAD_MORE' });
        loadMorePictures(dispatch, { text, page: photos.page+1 });
    }, [text]);

    return <div className="search-bar">search-bar</div>;
};

export default SearchBar;