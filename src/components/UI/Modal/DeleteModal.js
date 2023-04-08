import React from "react";
import ReactDOM from "react-dom";
import "../../../styles/UI/Modal/DeleteModal.scss";
import { BackDrop } from "./SearchModal";
import Button from "../Button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DeleteModalOverlay = ({ id, replyId, setShowDeleteModal, type }) => {

    const { commentId, movieId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");

    const navigate = useNavigate();

    const deleteReview = async (id, replyId) => {
        try {
            if (type === "comment") {
                const docRef = doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}`);
                await deleteDoc(docRef);
            } else if (type === "reply") {
                const docRef = doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}`);
                await deleteDoc(docRef);
            } else if (type === "singleComment") {
                const commentRoute = `/${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments`;
                console.log(commentRoute);
                const docRef = doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}`);
                navigate(commentRoute);
                await deleteDoc(docRef);
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="deleteModal">
            <h3>{`Delete ${commentId ? "Reply" : "Comment"}`}</h3>
            <p>
                {`Are you sure you want to delete this ${commentId ? "Reply" : "Comment"}?`}
            </p>
            <div className="deleteModal-btn">
                <Button className="cancel-btn"
                    handleClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button className="delete-btn"
                    handleClick={() => deleteReview(id, replyId)}>
                    Delete
                </Button>
            </div>
        </div>
    )
};

const portalElement = document.getElementById("overlays");

const DeleteModal = ({ id, replyId, setShowDeleteModal, type }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, portalElement)}
            {ReactDOM.createPortal((<DeleteModalOverlay
                type={type}
                id={id}
                replyId={replyId}
                setShowDeleteModal={setShowDeleteModal}
            />), portalElement)}
        </>
    );
};

export default DeleteModal;