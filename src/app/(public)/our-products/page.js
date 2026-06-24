'use client';

import { useState } from 'react';

const products = [
  { name: 'Yogurt Berries', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bdddfcf25db5a7b275_65820e5163416e9521272cb8_Yogurt%2520Berries.png', category: 'mixes' },
  { name: 'Watermelon', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bdde592a3c19e82c45_65820dcb1fb7c013511aff0a_Watermelon.png', category: 'sorbets' },
  { name: 'Strawberry', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc8bcdaa312e68e8d6_65820e9491d43eabcee0fb13_Strawberry.png', category: 'sorbets' },
  { name: 'Vanilla', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bcac52dae41f60b56c_65820d9d1fb7c013511ae625_Vanilla.png', category: 'singles' },
  { name: 'Pina Colada', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc76b51aa5708ef937_65820e2f23c71d0e0776d857_Pina%2520Colada.png', category: 'mixes' },
  { name: 'Pineapple', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc6f243e3e29fe1646_65820eb3d6126ad15c06e385_Pineapple.png', category: 'sorbets' },
  { name: 'Mocha', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc545406ad0dafb6b7_65820dbc22889de3873ac971_Mocha.png', category: 'singles' },
  { name: 'Mango', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc583561908883fa76_65820e5e92bcf63e2f7d7187_Mango.png', category: 'sorbets' },
  { name: 'Lemon Mint', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc85e70df2b29722cd_65820e06d311f826d0984619_Lemon%2520Mint.png', category: 'mixes' },
  { name: 'Cotton Candy Mix', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bcbb8dac6e0521b761_65820dd7085c536450f263bd_Cotton%2520Candy%2520Mix.png', category: 'mixes' },
  { name: 'Chocolate Cake', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bbd3adbabd97fff02b_65820e3ff21ebb5d9150febd_Chocolate%2520Cake.png', category: 'mixes' },
  { name: 'Birthday Cake', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bbaa0f9f27e97b16f4_65820df9a7005111d083469f_Birthday%2520Cake.png', category: 'mixes' },
  { name: 'BannaGum', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bb4fda91b984b053a3_65820dae7ecb9532a95223e4_BannaGum.png', category: 'mixes' },
  { name: 'Cookies N’ Cream', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bb6f243e3e29fe15e4_65820e218dcfa4fab9704881_Cookies%2520N%25E2%2580%2599%2520Cream.png', category: 'mixes' },
  { name: 'Cherry Cola', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bbe01fce488d9acc9d_65820e16fd48f4b1c1149a9f_Cherry%2520Cola.png', category: 'mixes' },
  { name: 'Chocolate', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bb7a2ea60a515f16de_65820d885e7eaa78ed3e5fd7_Chocolate.png', category: 'singles' },
];

export default function OurProductsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  return (
    <>
      {/* Small Hero */}
      <section className="section_small-hero">
        <h1 className="small-hero_heading is-purple">Our Products</h1>
        <div className="small-hero_image is-our-products"></div>
      </section>

      {/* Coolest Ice Cream */}
      <section className="section_coolest-ice-cream padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="horizontal-flex-container mobile-vertical">
            <div className="section-content_text-wrapper is-50 mobile-100">
              <h2 className="text-color-purple">Coolest ICE CREAM in the world!</h2>
              <p className="text-size-medium text-weight-medium text-color-purple">
                The unique texture of individual beads is formed on the basis of patented cryogenic technology with liquid
                nitrogen at -197ºC. This technology does not change the structure of the components of the dessert, and the
                speed of freezing eliminates the storage of water in the product, preserving its natural taste. Minimelts
                does not contain any artificial preservatives or genetically modified ingredients.
                <br />
                <br />
                Fantastic colours are the result of using only natural food colourings. Minimelts does not contain air bubbles.
              </p>
            </div>
            <div className="minimelts-coolest-cream_image-container">
              <img
                src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/658884a080101def93ad949a_Fochia%20Dotted%20Circle.svg"
                loading="lazy"
                alt=""
                className="minimelts-coolest-cream_fochia-dotted-circle"
              />
              <img
                src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/65888414a6298c932c5f8a46_Coolest-ICE-CREAM%20Image.png"
                loading="eager"
                sizes="(max-width: 479px) 91vw, (max-width: 767px) 94vw, (max-width: 991px) 46vw, (max-width: 1919px) 36vw, 34vw"
                srcSet="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/65888414a6298c932c5f8a46_Coolest-ICE-CREAM%20Image-p-500.png 500w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/65888414a6298c932c5f8a46_Coolest-ICE-CREAM%20Image.png 760w"
                alt="Coolest Ice Cream"
                className="image_minimelts-coolest-cream"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flavors Section */}
      <section className="section_flavors padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <h2 className="text-align-center text-color-purple">Minimelts Flavors &amp; Ice Cream Classics</h2>
          
          <div className="products-tabs_container w-tabs">
            {/* Tab Links */}
            <div className="products-tabs_menu w-tab-menu">
              <button
                onClick={() => setActiveTab('all')}
                className={`products-tabs_link w-inline-block w-tab-link ${activeTab === 'all' ? 'w--current' : ''}`}
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <div>All Flavors</div>
              </button>
              <button
                onClick={() => setActiveTab('singles')}
                className={`products-tabs_link w-inline-block w-tab-link ${activeTab === 'singles' ? 'w--current' : ''}`}
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <div>Singles</div>
              </button>
              <button
                onClick={() => setActiveTab('mixes')}
                className={`products-tabs_link w-inline-block w-tab-link ${activeTab === 'mixes' ? 'w--current' : ''}`}
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <div>Mixes</div>
              </button>
              <button
                onClick={() => setActiveTab('sorbets')}
                className={`products-tabs_link w-inline-block w-tab-link ${activeTab === 'sorbets' ? 'w--current' : ''}`}
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                <div>Sorbets</div>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="products-tabs_content-wrapper w-tab-content" style={{ opacity: 1, transition: 'opacity 0.3s' }}>
              <div className="w-tab-pane w--tab-active">
                <div className="w-dyn-list">
                  <div role="list" className="products-tabs_collection-list w-dyn-items">
                    {filteredProducts.map((product, idx) => (
                      <div role="listitem" className="w-dyn-item" key={idx}>
                        <div className="products-tabs_product-block">
                          <div className="products-tabs_product-image-wrapper">
                            <img
                              loading="lazy"
                              alt={product.name}
                              src={product.img}
                              className="image"
                            />
                            <img
                              loading="lazy"
                              alt=""
                              src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c5e17a9f8d4de02fe508_Splash.png"
                              className="image_products-splash"
                            />
                          </div>
                          <div className="products-tabs_product-name">{product.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beverages Section */}
      <section className="section_beverages padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <h2 className="text-align-center text-color-purple">Minimelts Beverages</h2>
          <div className="products-tabs_container w-tabs">
            <div className="products-tabs_menu w-tab-menu">
              <div className="products-tabs_link w-inline-block w-tab-link w--current">
                <div>All Beverages</div>
              </div>
            </div>
            <div className="products-tabs_content-wrapper w-tab-content">
              <div className="w-tab-pane w--tab-active">
                <div className="w-dyn-list">
                  <div className="w-dyn-empty">
                    <div>No items found.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section_beverages padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <h2 className="text-align-center text-color-purple">New Arrivals</h2>
          <div className="new-arrivals_collection-wrapper w-dyn-list">
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
