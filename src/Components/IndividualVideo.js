import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ReactPlayer from "react-player";
import axios from "axios";
import 'remixicon/fonts/remixicon.css';
import apilist from "../apilist/apilist";
import "./LikeDislike.css";

const IndividualVideo = () => {
    const [videoDetails, setVideoDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);
    const [savedActive, setSavedActive] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchIndividualVideo = async () => {
            try {
                const response = await axios.get(`${apilist.individualVideo}/${id}`);
                setVideoDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchIndividualVideo();
    }, [id]);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleCancelClick = () => {
        setIsPlaying(false);
        window.location.href = "/";
    };

    const handleLike = () => {
        setLikeActive(true);
        setDislikeActive(false);
        setSavedActive(false);
        console.log("Liked!");
    };

    const handleDislike = () => {
        setLikeActive(false);
        setDislikeActive(true);
        setSavedActive(false);
        console.log("Disliked!");
    };

    const toggleSavedStatus = async () => {
        const newStatus =
          videoDetails.savedStatus === "Saved" ? "Not Saved" : "Saved";

        setVideoDetails({ ...videoDetails, savedStatus: newStatus });

        try {
            const response = await axios.put(
                `${apilist.savedvideos}/${id}/saved`,
                { savedStatus: newStatus }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }

        setLikeActive(false);
        setDislikeActive(false);
        setSavedActive(!savedActive);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="col-12">
                            <ReactPlayer
                                url={videoDetails.video_url}
                                width={"100%"}
                                height={"400px"}
                                style={{ marginTop: '60px', marginBottom: '30px' }}
                                controls={true}
                                controlsList={"nodownload"}
                                config={{ youtube: { playerVars: { controls: 1 } } }}
                                playing={isPlaying}
                                allowFullScreen={true}
                                onPlay={handlePlay}
                                onPause={handlePause}
                            />
                            {isPlaying && (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleCancelClick}
                                    style={{ marginBottom: '10px', marginTop: '10px' }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                        <div className="col-12">
                            <p className="mt-3">{videoDetails.title}</p>
                        </div>
                        <div className="col-12">
                            <div className="d-flex justify-content-between">
                                <p>{videoDetails.view_count}</p>
                                <p>{videoDetails.video_uploaded_date}</p>
                                <div className="like-dislike-container">
    <div className="d-flex">
        <span className={`mx-2 ${likeActive ? 'active' : ''}`} onClick={handleLike}>
            <i className="ri-thumb-up-line" style={{ fontSize: '24px' }}></i> Like
        </span>
        <span className={`mx-2 ${dislikeActive ? 'active' : ''}`} onClick={handleDislike}>
            <i className="ri-thumb-down-line" style={{ fontSize: '24px' }}></i> Dislike
        </span>
        <span className={`mx-2 ${savedActive ? 'active' : ''}`} onClick={toggleSavedStatus}>
            <i className="ri-save-3-fill" style={{ fontSize: '24px' }}></i> {videoDetails.savedStatus}
        </span>
    </div>
</div>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex">
                                <div>
                                    <img src={videoDetails.channel_logo} alt="Channel Logo" />
                                </div>
                                <div>
                                    <p className="m-0">{videoDetails.channel_name}</p>
                                    <p className="m-0"> {videoDetails.channel_subscribers}</p>

                                    <p className="m-0">{videoDetails.video_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndividualVideo;
