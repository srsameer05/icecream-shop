import Navbar from '@/components/public/Navbar';

export const metadata = {
  title: 'The Famous Minimelts Ice-cream now in Egypt',
  description: 'Welcome to the world of Minimelts, where you have the power to create and unleash your wildest sweet dream.',
  openGraph: {
    title: 'The Famous Minimelts Ice-cream now in Egypt',
    description: 'Welcome to the world of Minimelts, where you have the power to create and unleash your wildest sweet dream.',
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
                  <div className="text-weight-bold is-orange mobile-aligned-centered">Factory</div>
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
                <img
                  src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d053_Logo.svg"
                  loading="lazy"
                  alt="Minimelts Egypt"
                  className="footer_logo"
                />
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
                <div className="footer_disclaimer">All rights reserved minimelts egypt</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
