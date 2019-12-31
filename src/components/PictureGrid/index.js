import React, { useContext, useEffect } from 'react';
import './index.scss';
import { PictureContext } from '../../contexts/PictureContext';
import { isObject, isNonEmptyArray, isNonEmptyString } from '../../helpers/checks';
import { loadMorePictures } from '../../queries/pictures';
import { Empty, Alert, Spin } from 'antd';

const PictureGrid = props => {
    const { loading, dispatch, text, photos, fetchingMore, stat, message } = useContext(PictureContext);

    const handleScroll = () => {
        if (
            fetchingMore === false &&
            isObject(photos) &&
            isNonEmptyArray(photos.photo) &&
            isNonEmptyString(photos.total) &&
            photos.photo.length < photos.total &&
            document.querySelector(".picture-grid .picture:last-of-type")
        ) {
            const lastPicture = document.querySelector(".picture-grid .picture:last-of-type");
            const lastPictureOffset = lastPicture.offsetTop + lastPicture.clientHeight;
            const pageOffset = window.pageYOffset + window.innerHeight;

            if (pageOffset > lastPictureOffset) {
                dispatch({ type: 'BEGIN_LOAD_MORE' });
                loadMorePictures(dispatch, { text, page: photos.page+1 });
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [fetchingMore, photos]);

    return <React.Fragment>
        {
            stat === "fail"
            ? <Alert
                message="Error"
                description={
                    isNonEmptyString(message)
                    ? message
                    : "There is some problem here! Try reloading the page and notify our dev team if the problem persists. They'll fix it ASAP."
                }
                type="error"
                showIcon
            /> : ''
        }

        <div className={`picture-grid ${
            !(isObject(photos) && isNonEmptyArray(photos.photo)) ? "empty" : ""
        }`}>
            {
                isObject(photos) && isNonEmptyArray(photos.photo)
                ? photos.photo
                    .map((picture, i) => <div className="picture" key={i}>
                        <img src={`https://farm${
                                picture.farm
                            }.staticflickr.com/${
                                picture.server
                            }/${
                                picture.id
                            }_${
                                picture.secret
                            }.jpg`}
                        />
                    </div>)
                : (
                    loading === true
                    ? <Spin size="large" />
                    : <Empty description="Nothing to show here!" />
                )
            }
        </div>

        {
            fetchingMore && <Spin size="large" />
        }
    </React.Fragment>;
};

export default PictureGrid;