export const pictureReducer = (state, action) => {
	switch (action.type) {
		case 'BEGIN_SEARCH':
			return {
				...state,
				loading: true
			};

		case 'SEARCH_PICTURES_SUCCESS':
			return {
				...state,
				...action.payload
			};

		case 'SEARCH_PICTURES_FAILURE':
			return {
				...state,
				...action.payload,
				photos: {
					...state.photos,
					photo: []
				}
			};

		case 'BEGIN_LOAD_MORE':
			return {
				...state,
				fetchingMore: true
			};

		case 'LOAD_MORE_SUCCESS':
			return {
				...state,
				...action.payload,
				photos: {
					...state.photos,
					...action.payload.photos,
					photo: [
						...state.photos.photo,
						...action.payload.photos.photo,
					]
				}
			};

		case 'LOAD_MORE_FAILURE':
			return {
				...state,
				...action.payload
			};
		
		case 'RESET_STATE':
			return {
				photos: { page: 0, photo: [] },
				stat: "ok",
				loading: false,
				fetchingMore: false,
				text: ""
			};

		default:
			return state;
	}
};