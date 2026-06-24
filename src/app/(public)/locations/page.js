'use client';

import { useState } from 'react';

const locations = [
  { name: 'Port Said', hours: 'Everyday from 10am to 12am', mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d716.9083133897168!2d32.30784718608593!3d31.270289586914103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDE2JzEzLjIiTiAzMsKwMTg'MjYuOSJF!5e0!3m2!1sar!2seg!4v1745318862984!5m2!1sar!2seg" },
  { name: 'Green Plaza Alexandria', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d426.56197429931285!2d29.964545654632456!3d31.20699070200226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1739783383611!5m2!1sen!2seg" },
  { name: 'City Centre Alexandria', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253.74375261577978!2d29.932792382556205!3d31.16651298957793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c26d673fdc49%3A0xd34e54a8f040c1af!2sCity%20Centre%20Alexandria!5e0!3m2!1sen!2seg!4v1733836745924!5m2!1sen!2seg" },
  { name: 'Tucano', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d362.96907472339234!2d31.322776099400382!3d30.060854733485506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1733836284547!5m2!1sen!2seg" },
  { name: 'A1 Mall Zahraa Elmaadi', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d305.5060122837525!2d31.312305962278387!3d29.9677608877297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1733836127364!5m2!1sen!2seg" },
  { name: 'District 5', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8221.409235080166!2d31.441491310872944!3d29.95997446559333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14582500532d3113%3A0x967bec13980f719b!2sMinimelts!5e0!3m2!1sen!2seg!4v1733835913605!5m2!1sen!2seg" },
  { name: 'All Season', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d305.1649782473362!2d31.66679661995125!3d30.07849941866942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1733835629270!5m2!1sen!2seg" },
  { name: 'Chuck E. Cheese', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0701203844133!2d31.023447686647415!3d30.034846110283212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585bdc2da52d9d%3A0x26866f2422713702!2sChuck%20E.%20Cheese!5e0!3m2!1sen!2seg!4v1733835210660!5m2!1sen!2seg" },
  { name: 'New Giza Club', hours: 'Everyday from 2pm to 12am', mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.089559766667!2d31.06259807555213!3d30.005584674943147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDAwJzIwLjEiTiAzMcKwMDMnNTQuNiJF!5e0!3m2!1sen!2seg!4v1733830997185!5m2!1sen!2seg" },
  { name: 'Arkan Plaza', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5564742006973!2d31.0032932!3d30.020889299999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14585b0525c31285%3A0xe916bcf3ee2db2ad!2sArkan%20Plaza!5e0!3m2!1sen!2seg!4v1704120241739!5m2!1sen!2seg" },
  { name: 'Open Air Mall', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.495682353973!2d31.626525100000002!3d30.108626599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d12448f1213%3A0xcabde2002ad1a1ca!2sOpen%20Air%20Mall%20-%20Madinaty!5e0!3m2!1sen!2seg!4v1704120200794!5m2!1sen!2seg" },
  { name: 'El Malahy', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.694671242226!2d31.450823500000002!3d29.9594599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823637dceeee9%3A0x5a1d90f2a28cfa7!2sEl%20Malahy!5e0!3m2!1sen!2seg!4v1704120161021!5m2!1sen!2seg" },
  { name: 'Cairo Festival City Mall', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2793223147405!2d31.4075884!3d30.0288434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583dd9f831b247%3A0xa7848c6a8c566be8!2sCairo%20Festival%20City%20Mall!5e0!3m2!1sen!2seg!4v1704120008827!5m2!1sen!2seg" },
  { name: 'City Stars Mall', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.7200871576633!2d31.338863000000003!3d30.073557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e13d8e2b2fb%3A0xf81a61f156f55adc!2sCity%20Stars%20Mall!5e0!3m2!1sen!2seg!4v1704119948072!5m2!1sen!2seg" },
  { name: 'Mall of Arabia', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.0546929671855!2d30.9753955!3d30.006585899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458575169329079%3A0xf8562fae56bf860f!2sMall%20of%20Arabia!5e0!3m2!1sen!2seg!4v1704120125697!5m2!1sen!2seg" },
  { name: 'Mall of Egypt', hours: 'Everyday from 9am to 11pm', mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.243637197248!2d31.0164062!3d29.972427399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145851ee0be1eec3%3A0xa5b302adfcac13d1!2sMall%20of%20Egypt!5e0!3m2!1sen!2seg!4v1704120069740!5m2!1sen!2seg" },
];

export default function LocationsPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedLoc = locations[selectedIdx];

  return (
    <>
      {/* Small Hero */}
      <section className="section_small-hero">
        <h1 className="small-hero_heading is-orange">Locations</h1>
        <div className="small-hero_image is-locations"></div>
      </section>

      {/* Find Store Header */}
      <section className="section_locations">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="locations_header-wrapper">
            <h2 className="text-align-center text-color-orange">Find your nearest store</h2>
            <p className="text-align-center text-size-medium is-75 mobile-100">
              Bringing Minimelts to Egypt with Mini for food manufacturing. Our goal is to establish a network of stores
              nationwide for Minimelts enthusiasts.
              <br />
              Minimelts is now more accessible than ever. Explore the locations below to locate a store near you.
            </p>
          </div>

          {/* Interactive Locations Map & Selector Container */}
          <div className="locations-tabs_container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', marginTop: '40px' }}>
            
            {/* Map Embed on Left */}
            <div className="locations_embed-container" style={{ height: '500px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee' }}>
              <iframe
                src={selectedLoc.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Selector list on Right */}
            <div
              className="locations-list-selector"
              style={{
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {locations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`locations-selector-btn ${idx === selectedIdx ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '16px',
                    borderRadius: '12px',
                    border: idx === selectedIdx ? '2px solid #f5a623' : '1px solid #eee',
                    backgroundColor: idx === selectedIdx ? '#fff9f0' : '#fff',
                    textAlign: 'left',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: idx === selectedIdx ? '0 4px 12px rgba(245, 166, 35, 0.15)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <img
                      src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6592d9f79c234dd69d272dda_Pin-orange.svg"
                      loading="lazy"
                      alt=""
                      style={{ width: '16px', height: '16px' }}
                    />
                    <h3
                      className="heading-style-h5 text-color-orange"
                      style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}
                    >
                      {loc.name}
                    </h3>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', paddingLeft: '24px' }}>{loc.hours}</div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
