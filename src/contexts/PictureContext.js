import React, { createContext, useReducer } from 'react';
import { pictureReducer } from '../reducers/pictureReducer';

export const PictureContext = createContext();

const PictureContextProvider = (props) => {
	const [state, dispatch] = useReducer(pictureReducer, {
		"photos": {
			"page": 1,
			"pages": 10464,
			"perpage": 12,
			"total": "125568",
			"photo": [
				{
					"id": "49304280571",
					"owner": "145245303@N02",
					"secret": "a770c7c91e",
					"server": "65535",
					"farm": 66,
					"title": "2019 Acura Sports Car Challenge at Mid-Ohio - Paul Holten and Matt Plumb in the #76 McLaen 720S GT3 - Compass Racing",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304264956",
					"owner": "168849656@N06",
					"secret": "541368a82e",
					"server": "65535",
					"farm": 66,
					"title": "",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49303765023",
					"owner": "113602725@N05",
					"secret": "400af62fa0",
					"server": "65535",
					"farm": 66,
					"title": "Lamborghini Urus",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304456767",
					"owner": "181667280@N06",
					"secret": "fc39fa8cd8",
					"server": "65535",
					"farm": 66,
					"title": "Per me sei la più bella e la più cara del mondo",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49303758478",
					"owner": "181667280@N06",
					"secret": "5194235cd8",
					"server": "65535",
					"farm": 66,
					"title": "per me c'è solo te mia cara",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49303751923",
					"owner": "125160113@N04",
					"secret": "044a9cd06f",
					"server": "65535",
					"farm": 66,
					"title": "Sunset with Clubcard Points",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304237436",
					"owner": "55202343@N08",
					"secret": "946b157754",
					"server": "65535",
					"farm": 66,
					"title": "Pista.",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49303748288",
					"owner": "55202343@N08",
					"secret": "58c37716c9",
					"server": "65535",
					"farm": 66,
					"title": "Pista.",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304234586",
					"owner": "55202343@N08",
					"secret": "8d13584231",
					"server": "65535",
					"farm": 66,
					"title": "Pista.",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304444047",
					"owner": "142838897@N04",
					"secret": "7c18c1ddc6",
					"server": "65535",
					"farm": 66,
					"title": "10 Common Causes Of Bicycle Accidents In San Francisco",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304231841",
					"owner": "7489025@N06",
					"secret": "78e15c87c0",
					"server": "65535",
					"farm": 66,
					"title": "Vitrall a Casa Felip (1905),  carrer Ausias March 20, Barcelona. (Modernista, Dissenyada per Telm Fernández i Janot).",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				},
				{
					"id": "49304229726",
					"owner": "155623451@N02",
					"secret": "59af51a845",
					"server": "65535",
					"farm": 66,
					"title": "Windscreen",
					"ispublic": 1,
					"isfriend": 0,
					"isfamily": 0
				}
			]
		},
		stat: "ok",
		loading: false,
		fetchingMore: false,
		text: "car"
	});

	return <PictureContext.Provider value={{ ...state, dispatch }}>
		{props.children}
	</PictureContext.Provider>;
}

export default PictureContextProvider;