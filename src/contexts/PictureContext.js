import React, { createContext, useReducer } from 'react';
import { pictureReducer } from '../reducers/pictureReducer';

export const PictureContext = createContext();

const PictureContextProvider = (props) => {
	const [state, dispatch] = useReducer(pictureReducer, {
		photos: { page: 0, photo: [] },
		stat: "ok",
		loading: false,
		fetchingMore: false,
		text: ""
	});

	console.log(state);
	return <PictureContext.Provider value={{ ...state, dispatch }}>
		{props.children}
	</PictureContext.Provider>;
}

export default PictureContextProvider;