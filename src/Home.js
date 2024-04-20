import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate} from 'react-router-dom';


const Home = () => {
  const [videosArray, setVideosArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
 

  const fetchDetails = async () => {
    try {
      const response = await axios.get('http://localhost:7777/get-video-details');
      setVideosArray(response.data);
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  const token = Cookies.get("jwtAuth");
  console.log(token);

  useEffect(() => {
    if (token === undefined) {
      navigate("/auth");
    }
  }, [navigate, token]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search query:', searchQuery);
  };

  const filteredVideos = videosArray.filter((video) =>
    video.video_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <section className='nav_bar_component'>
        <Navbar />
      </section>
      <section className='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <Sidebar />
          </div>
          <div className='col-md-9'>
            <section className='banner_comonent'>
              <a className="navbar-brand" href="/">
              <h1>Synergy Watch</h1>
              </a>
            </section>
            <section className='input_search'>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-secondary" onClick={handleSearchClick}>Search</button>
                </div>
              </div>
            </section>
            <section className='thumbnails_layout'>
              <div className='container'>
                <div className='row'>
                  {filteredVideos.length === 0 ? (
                    <div className='col-md-12'>
                      <img src="images.jpeg" alt="No videos found"  />
                      <h5>Search results!</h5>
                      <p> Video not found</p>
                      
                    </div>
                  ) : (
                    filteredVideos.map((video) => (
                      <div className='col-md-4 my-3' key={video._id}>
                        <Link to={`/video/${video._id}`}>
                          <div className='thumbnail_image'>
                            <img src={video.thumbnail_url} alt='Thumbnail Img' />
                          </div>
                          <div className='home_thumbnail_title'>
                            <h6 className='my-3'>{video.video_title}</h6>
                          </div>
                          <div className='home_channel_description d-flex'>
                            <div className='channel_logo'>
                              <img src={video.channel_logo} className='w-75 ' alt='Channel Logo' />
                            </div>
                            <div className='channel_description'>
                              <p>{video.channel_name}</p>
                              <p>{video.channel_subscribers}</p>
                              <p>{video.video_uploded_date}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
