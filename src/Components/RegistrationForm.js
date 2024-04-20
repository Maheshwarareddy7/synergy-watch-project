import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationForm.css';
import apilist from '../apilist/apilist';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: '',
    gender: '',
    education: '',
  });

  const navigate = useNavigate();

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    axios
      .post( apilist.signup, formData)
      .then((response) => {
        console.log(response.data);
        toast.success(`Registration successful`);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch((error) => {
        toast.error(`Error occurred while registering: ${error.message}`);
        console.error('Error:', error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="mainDiv">
        <div className="form_wrapper mt-5">
          <div className="form_container">
            <div className="title_container">
              <h2>Synergy Watch Registration</h2>
            </div>
            <div className="row clearfix">
              <div className="">
                <form onSubmit={submitForm}>
                  <div className="row clearfix">
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                    <div className="col_half">
                      <div className="input_field">
                        <span>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          required
                          value={formData.lastName}
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-phone" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      required
                      value={formData.mobileNumber}
                      onChange={handleFormData}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleFormData}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleFormData}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleFormData}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-address-card" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      required
                      value={formData.address}
                      onChange={handleFormData}
                    />
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-venus-mars" aria-hidden="true"></i>
                    </span>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleFormData}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="input_field">
                    <span>
                      <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      name="education"
                      placeholder="Education"
                      required
                      value={formData.education}
                      onChange={handleFormData}
                    />
                  </div>
                  <button type="submit" style={{ color: 'blue' }} >Register</button>
                </form>
                <p className="text-center">
                  Already have an account?{' '}
                  <Link to="/auth">
                    <span style={{ color: 'blue' }}>Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
