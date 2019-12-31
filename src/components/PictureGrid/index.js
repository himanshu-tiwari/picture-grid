import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { PictureContext } from '../../contexts/PictureContext';
import { isObject, isNonEmptyArray, isNonEmptyString } from '../../helpers/checks';
import { loadMorePictures } from '../../queries/pictures';
import { Empty, Alert, Spin, Modal, Card } from 'antd';

const PictureGrid = props => {
    const { loading, dispatch, text, photos, fetchingMore, stat, message } = useContext(PictureContext);
    const [modalState, setModalState] = useState({ visible: false, picture: {}});

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
                        <img
                            src={`https://farm${
                                picture.farm
                            }.staticflickr.com/${
                                picture.server
                            }/${
                                picture.id
                            }_${
                                picture.secret
                            }.jpg`}
                            alt={picture.title}
                            onClick={() => setModalState({ visible: true, picture })}
                        />
                    </div>)
                : (
                    loading === true
                    ? <Spin size="large" />
                    : <Empty description="Nothing to show here! Try out a new search" />
                )
            }
        </div>

        { fetchingMore && <Spin size="large" /> }

        {
            modalState.visible === true &&
            isObject(modalState.picture) &&
            <Modal
                visible={modalState.visible}
                footer={null}
                onCancel={() => setModalState({...modalState, visible: false})}
                className="img-modal"
                title={isNonEmptyString(modalState.picture.title) ? modalState.picture.title : null}
            >
                <img
                    src={`https://farm${
                        modalState.picture.farm
                    }.staticflickr.com/${
                        modalState.picture.server
                    }/${
                        modalState.picture.id
                    }_${
                        modalState.picture.secret
                    }.jpg`}
                    alt={modalState.picture.title}
                />
            </Modal>
        }
    </React.Fragment>;
};

export default PictureGrid;