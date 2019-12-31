import React, { createContext, useReducer } from 'react';
import { pictureReducer } from '../reducers/pictureReducer';

export const PictureContext = createContext();

const PictureContextProvider = (props) => {
	const [state, dispatch] = useReducer(pictureReducer, {
		photos: { page: 1, photo: [] },
		stat: "ok",
		loading: false,
		fetchingMore: false,
		text: ""
	});
	console.log(state);
	return <PictureContext.Provider value={{
		// photos,
		// stat,
		// code,
		// message,
		...state,
		dispatch
	}}>
		{props.children}
	</PictureContext.Provider>;
}

export default PictureContextProvider;