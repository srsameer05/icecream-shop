export const metadata = {
  title: 'Minimelts Egypt - Our World',
  description: "Follow the latest news, events, and jobs from Minimelts Egypt.",
};

const newsItems = [
  {
    title: 'All flavors are in hand',
    date: 'December 30, 2023',
    img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/65906a4f39b8ba9d618e59bc_News_4.jpg',
    description: "Egypt's vibrant energy to every scoop. Mango meets cardamom, every taste a sweet serenade to the land of pyramids and palms."
  },
  {
    title: 'New flavors drop',
    date: 'December 30, 2023',
    img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/659069ebfb84bc3e3d783152_News_3.jpg',
    description: "Egypt's vibrant energy to every scoop. Mango meets cardamom, every taste a sweet serenade to the land of pyramids and palms."
  },
  {
    title: 'Minimelts for every mood',
    date: 'December 30, 2023',
    img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/659069a564aed4b6f4ec0af3_News_2.jpg',
    description: "Egypt's vibrant energy to every scoop. Mango meets cardamom, every taste a sweet serenade to the land of pyramids and palms."
  }
];

const eventsItems = [
  {
    title: 'Minimelts Mall of Egypt',
    location: '6th of October, Central axis, Mall of Egypt, Giza, Egypt',
    date: '10 January, 2024',
    img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/659077d4b807603c1cf8a3ff_Event_2.jpg'
  },
  {
    title: 'Minimelts launch in Mall of Arabia',
    location: '6th of October, Central axis, Mall of Arabia, Giza, Egypt',
    date: '12 March, 2024',
    img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/659077f43fcec21648efb29e_Event_1.jpg'
  }
];

const jobsItems = [
  {
    title: 'Stage Manager',
    location: 'Mall of Egypt',
    locationUrl: 'https://maps.app.goo.gl/QHb3n2HW6VGdZ5r4A',
    description: 'Oversees all shop operations, handles staff scheduling and training, manages inventory and finances, ensures customer satisfaction, and reports to the owner.',
    type: 'Project based'
  },
  {
    title: 'Manager/Store Supervisor',
    location: 'City Stars Mall',
    locationUrl: 'https://maps.app.goo.gl/EChFKCSryCNAxJnD6',
    description: 'Oversees all shop operations, handles staff scheduling and training, manages inventory and finances, ensures customer satisfaction, and reports to the owner.',
    type: 'Part-time'
  },
  {
    title: 'Cashier',
    location: 'Mall of Egypt',
    locationUrl: 'https://maps.app.goo.gl/QHb3n2HW6VGdZ5r4A',
    description: 'Operates the cash register, processes payments, answers customer questions, and may stock merchandise or prepare simple treats.',
    type: 'Full-time'
  }
];

export default function OurWorldPage() {
  return (
    <>
      {/* Small Hero */}
      <section className="section_small-hero">
        <h1 className="small-hero_heading is-orange">Our World</h1>
        <div className="small-hero_image is-our-world"></div>
      </section>

      {/* News Section */}
      <section className="section_news padding-section-small">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="section-header_container is-aligned-centered">
            <h2 className="text-align-center text-color-orange">News</h2>
            <p className="text-align-center text-size-medium is-75 mobile-100">
              Follow the latest news from Minimelts Egypt.
            </p>
          </div>

          <div className="news_collection-list-wrapper w-dyn-list">
            <div role="list" className="news_collections-list w-dyn-items">
              {newsItems.map((news, idx) => (
                <div role="listitem" className="w-dyn-item" key={idx}>
                  <div className="news_link-block">
                    <div
                      style={{ backgroundImage: `url("${news.img}")` }}
                      className="news_thumbnail"
                    ></div>
                    <div className="news_content-wrapper">
                      <div className="news_date-text">{news.date}</div>
                      <div className="news_header-wrapper">
                        <h3 className="text-color-primary text-weight-medium text-style-2lines heading-style-h4 mobile-larger">
                          {news.title}
                        </h3>
                        <img
                          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/659076f5322c326ec845fc89_arrow-up-right.svg"
                          loading="lazy"
                          alt=""
                          className="news_header-icon"
                        />
                      </div>
                      <p className="text-color-secondary text-style-3lines">{news.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section_events padding-section-small">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="section-header_container is-aligned-centered">
            <h2 className="text-align-center text-color-purple">Events</h2>
            <p className="text-align-center text-size-medium is-75 mobile-100">
              In Minimelts, good things happen fast. Check our latest events to stay updated on what's happening in our world!
            </p>
          </div>

          <div className="events_collection-list-wrapper w-dyn-list">
            <div role="list" className="events_collection-list w-dyn-items">
              {eventsItems.map((event, idx) => (
                <div role="listitem" className="w-dyn-item" key={idx}>
                  <div className="events_container">
                    <div
                      style={{ backgroundImage: `url("${event.img}")` }}
                      className="events_thumbnail"
                    ></div>
                    <div className="events_content-container">
                      <div>
                        <div className="events_text-wrapper">
                          <h3 className="text-color-primary text-weight-medium heading-style-h4 mobile-larger">
                            {event.title}
                          </h3>
                          <div className="text-color-secondary">{event.location}</div>
                        </div>
                      </div>
                      <div className="events_date-vertical-wrapper">
                        <div className="events_date-text">{event.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="section_jobs padding-section-small">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="section-header_container is-aligned-centered">
            <h2 className="text-align-center text-color-fochia">Jobs</h2>
            <p className="text-align-center text-size-medium is-75 mobile-100">
              Interested in joining the Minimelts Team? Great! Check these openings out and apply.
            </p>
          </div>

          <div className="jobs_collection-list-wrapper w-dyn-list">
            <div role="list" className="jobs_collection-list w-dyn-items">
              {jobsItems.map((job, idx) => (
                <div role="listitem" className="w-dyn-item" key={idx}>
                  <div className="jobs_container">
                    <div className="jobs_content-wrapper">
                      <a href={job.locationUrl} target="_blank" rel="noopener noreferrer" className="jobs_location-wrapper w-inline-block">
                        <img
                          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/65908a7b7872103d0a339efb_Pin.svg"
                          loading="lazy"
                          alt=""
                          className="jobs_location-icon"
                        />
                        <div className="jobs_location-text">{job.location}</div>
                      </a>
                      <h3 className="text-color-primary text-weight-medium heading-style-h4 mobile-larger">
                        {job.title}
                      </h3>
                      <p className="text-color-secondary">{job.description}</p>
                      <div className="jobs_type-wrapper">
                        <img
                          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6590862288fbae0751101bd9_clock.svg"
                          loading="lazy"
                          alt=""
                        />
                        <div className="text-weight-medium">{job.type}</div>
                      </div>
                    </div>
                    <div className="w-embed">
                      <a
                        className="apply-nw-btn"
                        href={`mailto:careers@minimelts.com.eg?subject=${encodeURIComponent(job.title)}`}
                        style={{
                          display: 'inline-block',
                          padding: '10px 24px',
                          backgroundColor: '#e11d48',
                          color: '#fff',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          marginTop: '16px'
                        }}
                      >
                        Apply now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
