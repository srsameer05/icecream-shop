'use client';

import { useState } from 'react';

export default function ContactUsPage() {
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
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <>
      {/* Small Hero */}
      <section className="section_small-hero">
        <h1 className="small-hero_heading is-blue">Contact us</h1>
        <div className="small-hero_image is-contact-us"></div>
      </section>

      {/* Contact Section */}
      <section className="section_contact-us">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="contact-us_horizontal-flex-container mobile-vertical">
            
            {/* Info Message */}
            <div className="contact-us_message-container mobile-100">
              <h2 className="heading-style-h3 text-weight-xbold text-color-blue">We’d love to hear from you</h2>
              <div className="text-size-medium">
                Feel free to contact Scoop Bill anytime, day or night, via email, our contact form, or the mailing address provided below.
                <br />
                <br />
                We embrace all forms of communication, including suggestions and feedback from our valued fans and stakeholders.
                <br />
                <br />
                For general inquiries send us an email at:
                <br />
                <a href="mailto:info@scoopbill.com?subject=Getting%20in%20Touch">
                  <span style={{ textDecoration: 'underline', color: 'inherit', fontWeight: 'bold' }}>info@scoopbill.com</span>
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="contact-us_form-container">
              <div className="contact-us_form-header-wrapper">
                <h2 className="heading-style-h3 text-weight-xbold text-color-blue">Get in touch</h2>
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
                        placeholder="Email"
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
                    <input type="submit" className="button is-blue w-button" value="Send message" />
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
