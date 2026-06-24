import Navbar from '@/components/public/Navbar';

export const metadata = {
  title: 'Scoop Bill - Premium Artisanal Ice Cream',
  description: 'Welcome to the world of Scoop Bill, where we churn the finest artisanal ice cream. Taste the velvety difference!',
  openGraph: {
    title: 'Scoop Bill - Premium Artisanal Ice Cream',
    description: 'Welcome to the world of Scoop Bill, where we churn the finest artisanal ice cream. Taste the velvety difference!',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d054_Hero%20Image.jpg',
      },
    ],
  },
};

export default function PublicLayout({ children }) {
  return (
    <>
      {/* Load Webflow Stylesheet for Minimelts Theme */}
      <link
        href="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/css/minimelts-staging-link.webflow.shared.0a19953d1.css"
        rel="stylesheet"
        type="text/css"
      />
      <div className="page-wrapper">
        <Navbar />
        <div className="main-wrapper">
          {children}
        </div>
        
        {/* Footer */}
        <section className="footer padding-section-medium">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="footer_container">
              {/* Addresses */}
              <div className="footer_block aligned-left">
                <div className="footer_location-wrapper">
                  <div className="text-weight-bold is-orange mobile-aligned-centered">Scoop Bill Churnery</div>
                  <div className="mobile-aligned-centered">
                    Plot Number 9, Takseem 124 Feddan, Abu Rawash industrial Area, Cairo - Alex Desert Road, Giza, Egypt
                  </div>
                </div>
                <div className="footer_location-wrapper">
                  <div className="text-weight-bold is-orange mobile-aligned-centered">Head office</div>
                  <div className="mobile-aligned-centered">
                    24 Mohamed EL Ghazaly st. of Mesadak 12311, Dokki, Giza, Egypt.
                  </div>
                </div>
              </div>

              {/* Logo and Socials */}
              <div className="footer_block aligned-centered">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 12.38 7.39 15.18 10.5 15.82V20C10.5 20.55 10.95 21 11.5 21H12.5C13.05 21 13.5 20.55 13.5 20V15.82C16.61 15.18 19 12.38 19 9C19 5.13 15.87 2 12 2ZM12 14C9.24 14 7 11.76 7 9C7 6.24 9.24 4 12 4C14.76 4 17 6.24 17 9C17 11.76 14.76 14 12 14Z" fill="#e8527a"/>
                    <path d="M9 9C9 7.34 10.34 6 12 6C12.55 6 13 5.55 13 5C13 4.45 12.55 4 12 4C9.24 4 7 6.24 7 9C7 9.55 7.45 10 8 10C8.55 10 9 9.55 9 9Z" fill="#3dbf9a"/>
                  </svg>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: '#e8527a', fontFamily: 'Nunito, sans-serif' }}>
                    Scoop<span style={{ color: '#3dbf9a' }}>Bill</span>
                  </span>
                </div>
                <div className="footer_social-icons-wrapper">
                  <a href="https://www.facebook.com/minimelts.eg" target="_blank" rel="noopener noreferrer" className="w-inline-block">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d081_Facebook.svg" loading="lazy" alt="Facebook" />
                  </a>
                  <a href="https://www.instagram.com/minimeltseg/" target="_blank" rel="noopener noreferrer" className="w-inline-block">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d082_Instagram.svg" loading="lazy" alt="Instagram" />
                  </a>
                  <a href="#" className="w-inline-block">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d083_X.svg" loading="lazy" alt="X" />
                  </a>
                  <a href="https://www.youtube.com/@MinimeltsEgypt" target="_blank" rel="noopener noreferrer" className="w-inline-block">
                    <img src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d084_Youtube.svg" loading="lazy" alt="Youtube" />
                  </a>
                </div>
                <a href="/locations" className="button w-button">Store locations</a>
              </div>

              {/* Back to Top */}
              <div className="footer_block aligned-right">
                <a href="#Navbar" className="link-block w-inline-block">
                  <img
                    src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d085_Arrow-up.svg"
                    loading="lazy"
                    alt="Arrow up"
                  />
                  <div className="footer_link">Back to Top</div>
                </a>
                <div className="footer_disclaimer">All rights reserved Scoop Bill</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
