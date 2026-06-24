'use client';

import { useState } from 'react';

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Partner form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <>
      {/* Small Hero */}
      <section className="section_small-hero">
        <h1 className="small-hero_heading is-fochia">Partners</h1>
        <div className="small-hero_image is-partners"></div>
      </section>

      {/* Become Partner Form Section */}
      <section className="section_contact-us">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="contact-us_horizontal-flex-container mobile-vertical">
            
            {/* Info Message */}
            <div className="contact-us_message-container mobile-100">
              <h2 className="heading-style-h3 text-weight-xbold text-color-fochia">Become our partner</h2>
              <div className="text-size-medium" style={{ marginBottom: '20px' }}>
                Minimelts Egypt is open to forming mutually beneficial collaborations in sales and marketing through
                Minimelts global and proven business model which is supported by over 20 years of experience in 55 different
                countries around the world.
              </div>
              <div className="partners-offers_container" style={{ marginBottom: '20px' }}>
                <h4 className="text-color-fochia">We offer our partners</h4>
                <div className="partners-offers_points-wrapper">
                  <div className="partners-offers_point">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6588aa49e0c14e285b5e31b7_Check%20icon.svg" loading="lazy" alt="" />
                    <div className="text-size-medium text-weight-medium">Reliable cooperation</div>
                  </div>
                  <div className="partners-offers_point">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6588aa49e0c14e285b5e31b7_Check%20icon.svg" loading="lazy" alt="" />
                    <div className="text-size-medium text-weight-medium">Extensive support</div>
                  </div>
                  <div className="partners-offers_point">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6588aa49e0c14e285b5e31b7_Check%20icon.svg" loading="lazy" alt="" />
                    <div className="text-size-medium text-weight-medium">Top quality goods</div>
                  </div>
                  <div className="partners-offers_point">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6588aa49e0c14e285b5e31b7_Check%20icon.svg" loading="lazy" alt="" />
                    <div className="text-size-medium text-weight-medium">Top quality services</div>
                  </div>
                </div>
              </div>
              <div className="text-size-medium">
                We also invite co-branded joint ventures and activities with both local and international brands that brings us
                closer to our fans and helps our partners achieve their goals.
                <br />
                <br />
                <span className="text-weight-medium">For partnership inquiries send an email at: </span>
                <a href="mailto:Sales@minimelts.com.eg?subject=Partnership">
                  <span className="text-weight-medium" style={{ textDecoration: 'underline' }}>Sales@minimelts.com.eg</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="contact-us_form-container">
              <div className="contact-us_form-header-wrapper">
                <h2 className="heading-style-h3 text-weight-xbold text-color-fochia">Get in touch</h2>
                <div className="text-size-medium">Please fill out this form.</div>
              </div>
              <div className="w-form">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="contact-us_form-wrapper">
                    <div className="contact-us_2-fields-wrapper">
                      <div className="contact-us_label-inputfield-wrapper">
                        <label htmlFor="First-name" className="contact-us_form-label">First name</label>
                        <input
                          className="contact-us_form-field w-input"
                          placeholder="First name"
                          type="text"
                          id="First-name"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="contact-us_label-inputfield-wrapper">
                        <label htmlFor="Last-name" className="contact-us_form-label">Last name</label>
                        <input
                          className="contact-us_form-field w-input"
                          placeholder="Last name"
                          type="text"
                          id="Last-name"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="contact-us_label-inputfield-wrapper">
                      <label htmlFor="Email" className="contact-us_form-label">Email</label>
                      <input
                        className="contact-us_form-field w-input"
                        placeholder="you@company.com"
                        type="email"
                        id="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="contact-us_label-inputfield-wrapper">
                      <label htmlFor="Phone-Number" className="contact-us_form-label">Phone Number</label>
                      <input
                        className="contact-us_form-field w-input"
                        placeholder="Phone Number"
                        type="tel"
                        id="Phone-Number"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="contact-us_label-inputfield-wrapper">
                      <label htmlFor="Message" className="contact-us_form-label">Message</label>
                      <textarea
                        id="Message"
                        placeholder="Leave us a message..."
                        className="contact-us_message-field w-input"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                    <input type="submit" className="button is-fochia w-button" value="Send message" />
                  </form>
                ) : (
                  <div className="w-form-done" style={{ display: 'block' }}>
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
