import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import apilist from "../apilist/apilist";

const SavedVideos = () => {
    // State to hold saved videos
    const [savedVideos, setSavedVideos] = useState([]);

    // Function to fetch saved videos from the server
    const fetchSavedVideos = async () => {
        try {
            // Fetch saved videos from the server
            const response = await axios.get(apilist.savedvideos);
            console.log("Response data:", response.data);

            // Check if the response contains saved videos
            if (response.data && Array.isArray(response.data.savedvideos)) {
                setSavedVideos(response.data.savedvideos);
            } else {
                console.warn("Unexpected data format in response:", response.data);
            }
        } catch (error) {
            console.error("Error fetching saved videos:", error);
        }
    };

    // Fetch saved videos when the component mounts
    useEffect(() => {
        fetchSavedVideos();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="container-fluid">
                            <div className="row">
                                {/* Display saved videos */}
                                {savedVideos.map((video) => (
                                    <div className="col-md-4 my-3" key={video._id}>
                                        <Link to={`/video/${video._id}`}>
                                            <div className="thumbnail_image">
                                                <img src={video.thumbnail_url} alt={video.title} />
                                            </div>

                                            <div className="home_thumbnail_title">
                                                <h6 className="my-3">{video.title}</h6>
                                            </div>
                                        </Link>
                                        <div className="home_channel_description d-flex">
                                            <div className="channel_logo">
                                                <img src={video.channel_logo} alt={video.channel_name} className="w-75" />
                                            </div>
                                            <div className="channel_description">
                                                <p>{video.channel_name}</p>
                                                <p>{video.channel_subscribers}</p>
                                                <p>{video.video_uploaded_date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedVideos;
