import Axios from 'axios';
import { key } from '../config/flickr';

export const searchPictures = async (dispatch, input) => {
    console.log(input);
    try {
        const response = await Axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
                key
            }&text=${
                ""
            }&media=photos&per_page=10&page=${
                1
            }&format=json&nojsoncallback=1`);
            
        if (response.data && typeof(response.data) === "object") {
            dispatch({
                type: "SEARCH_PICTURES_SUCCESS",
                payload: {
                    ...response.data,
                    loading: false,
                    text: input.text
                }
            });
        } else {
            dispatch({
                type: "SEARCH_PICTURES_FAILURE",
                payload: {
                    stat: "fail",
                    message: "Unexpected error!",
                    loading: false,
                    text: input.text
                }
            });
        }
    } catch (error) {
        dispatch({ 
            type: "SEARCH_PICTURES_FAILURE",
            payload: {
                stat: "fail",
                message: error.message,
                loading: false,
                text: input.text
            }
        });
    }
}

export const loadMorePictures = async (dispatch, input) => {
    try {
        const response = await Axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
                key
            }&text=${
                input.text
            }&media=photos&per_page=10&page=${
                input.page
            }&format=json&nojsoncallback=1`);
        
        if (response.data && typeof(response.data) === "object") {
            dispatch({
                type: "LOAD_MORE_SUCCESS",
                payload: {
                    ...response.data,
                    fetchingMore: false
                }
            });
        } else {
            dispatch({
                type: "LOAD_MORE_FAILURE",
                payload: {
                    stat: "fail",
                    message: "Unexpected error!",
                    fetchingMore: false
                }
            });
        }
    } catch (error) {
        dispatch({
            type: "LOAD_MORE_FAILURE",
            payload: {
                stat: "fail",
                message: error.message,
                fetchingMore: false
            }
        });
    };
};