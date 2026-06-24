import Link from 'next/link';

const flavors = [
  { name: 'Berry Yogurt Scoop', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bdddfcf25db5a7b275_65820e5163416e9521272cb8_Yogurt%2520Berries.png' },
  { name: 'Watermelon Sorbet', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bdde592a3c19e82c45_65820dcb1fb7c013511aff0a_Watermelon.png' },
  { name: 'Strawberry Cup', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc8bcdaa312e68e8d6_65820e9491d43eabcee0fb13_Strawberry.png' },
  { name: 'Vanilla Cone', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bcac52dae41f60b56c_65820d9d1fb7c013511ae625_Vanilla.png' },
  { name: 'Pina Colada Special', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc76b51aa5708ef937_65820e2f23c71d0e0776d857_Pina%2520Colada.png' },
  { name: 'Pineapple Scoop', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc6f243e3e29fe1646_65820eb3d6126ad15c06e385_Pineapple.png' },
  { name: 'Mocha Magic', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc545406ad0dafb6b7_65820dbc22889de3873ac971_Mocha.png' },
  { name: 'Mango Delight', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc583561908883fa76_65820e5e92bcf63e2f7d7187_Mango.png' },
  { name: 'Lemon Mint Splash', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bc85e70df2b29722cd_65820e06d311f826d0984619_Lemon%2520Mint.png' },
  { name: 'Cotton Candy Scoop', img: 'https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c5e17a9f8d4de02fe508_Splash.png' }, // fallback
  { name: 'Chocolate Cake Fudge', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bbd3adbabd97fff02b_65820e3ff21ebb5d9150febd_Chocolate%2520Cake.png' },
  { name: 'Birthday Cake Sprinkles', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bbaa0f9f27e97b16f4_65820df9a7005111d083469f_Birthday%2520Cake.png' },
  { name: 'Banana Bubblegum', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bb4fda91b984b053a3_65820dae7ecb9532a95223e4_BannaGum.png' },
  { name: 'Cookies N’ Cream Premium', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bb6f243e3e29fe15e4_65820e218dcfa4fab9704881_Cookies%2520N%25E2%2580%2599%2520Cream.png' },
  { name: 'Cherry Cola Float', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bbe01fce488d9acc9d_65820e16fd48f4b1c1149a9f_Cherry%2520Cola.png' },
  { name: 'Dark Chocolate Scoop', img: 'https://cdn.prod.website-files.com/6585c592094e32e9fd5e8886/6585c5bb7a2ea60a515f16de_65820d885e7eaa78ed3e5fd7_Chocolate.png' },
];

export default function Homepage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section_hero">
        <img
          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d059_Yellow%20Strip.svg"
          loading="eager"
          alt=""
          className="strip_yellow"
        />
        <div className="strip-bg yello"></div>
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="hero_container">
            <div className="hero_content-wrapper">
              <h1 className="mobile-aligned-centered">The coolest</h1>
              <h1 className="hero_large-h1 mobile-aligned-centered">Ice Cream</h1>
              <h1 className="mobile-aligned-centered">in town</h1>
            </div>
            <a href="#Second-Two" className="button is-red w-button">Explore our scoops</a>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="Second-Two" className="section_who-are-we">
        <div className="w-layout-blockcontainer container-large _2-cols _1-col-mobile w-container">
          <div className="section-content_container">
            <div className="section-content_text-wrapper mobile-100">
              <h2 className="text-color-white">Who we are?</h2>
              <p className="text-size-medium text-weight-medium text-color-white">
                We represent a whole new generation of ice cream lovers. Scoop Bill is constantly on the lookout for
                standing out: we are fresh, youthful, hip, distinctive, trendy, fierce, bold, risk-takers, innovative,
                and above all else, we are unique in delivering pure happiness in every scoop.
              </p>
            </div>
            <Link href="/about-us" className="button is-yellow w-button">Learn more</Link>
          </div>
          <img
            src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d05a_skateboard%201.png"
            loading="eager"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 940px"
            srcSet="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d05a_skateboard%25201-p-500.png 500w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d05a_skateboard%25201-p-800.png 800w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d05a_skateboard%201.png 986w"
            alt="skateboard"
            className="image_skateboard"
          />
        </div>
        <img
          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d066_Orange%20Vertical%20Strip.svg"
          loading="eager"
          alt=""
          className="orange-vertical-strip"
        />
      </section>

      {/* Futuristic / Artisanal Ice Cream */}
      <section className="section_futuristic-ice-cream">
        <img
          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d06f_Yellow%20Strip%202.svg"
          loading="eager"
          alt=""
          className="strip_yellow-2"
        />
        <div className="w-layout-blockcontainer container-large _2-cols w-container">
          <div className="left-fake-block"></div>
          <div className="section-content_container is-50 mobile-100">
            <div className="section-content_text-wrapper is-100">
              <h2 className="text-color-white">Artisanal Churned Ice Cream, anyone ?</h2>
              <p className="text-size-medium text-weight-medium text-color-white">
                Scoop Bill is a premium, batch-churned ice-cream that looks, feels, and tastes totally different. Churned at
                optimal temperatures to eliminate air bubbles and ice crystals, it gives you a rich, velvety, and immersive
                tasting experience that takes you places and blows your mind.
              </p>
            </div>
          </div>
        </div>
        <div className="strip-bg orange"></div>
      </section>

      {/* Our Flavors */}
      <section className="section_our-flavors">
        <img
          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d078_Blue%20Strip.svg"
          loading="eager"
          alt=""
          className="strip_blue"
        />
        <img
          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d079_Ice%20Cream%20Spoon.png"
          loading="lazy"
          alt="Ice cream spoon"
          className="ice-cream-spoon"
        />
        <div className="w-layout-blockcontainer container-large aligned-centered w-container">
          <h2 className="text-color-blue text-align-center">Our flavors</h2>
          <div className="flavors_collection-wrapper w-dyn-list">
            <div role="list" className="flavors_collection-list w-dyn-items">
              {flavors.map((flavor, index) => (
                <div role="listitem" className="w-dyn-item" key={index}>
                  <div className="flavors_item-block">
                    <div
                      style={{ backgroundImage: `url("${flavor.img}")` }}
                      className="flavors_item-image"
                    ></div>
                    <div className="flavors_item-name">{flavor.name}</div>
                    <img
                      src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c5e17a9f8d4de02fe508_Splash.png"
                      loading="lazy"
                      alt=""
                      className="splash-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/our-products" className="button is-blue top-layer w-button">Explore other products</Link>
        </div>
      </section>

      {/* We Go Way Back */}
      <section className="section_we-go-way-back">
        <img
          src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d080_White%20Strip.svg"
          loading="eager"
          alt=""
          className="strip_white"
        />
        <div className="w-layout-blockcontainer container-large _2-cols _1-col-mobile w-container">
          <div className="section-content_text-wrapper mobile-100">
            <h2>We go way back…</h2>
            <div className="statistic_container">
              <div className="statistic_wrapper">
                <div className="statistic_number">5</div>
                <div className="statistic_title">continents</div>
              </div>
              <div className="statistic_wrapper">
                <div className="statistic_number">55</div>
                <div className="statistic_title">countries</div>
              </div>
              <div className="statistic_wrapper">
                <div className="statistic_number">20</div>
                <div className="statistic_title">years</div>
              </div>
            </div>
            <p className="text-size-medium text-weight-medium">
              Our master churners have been perfecting the art of batch freezing and flavor extraction for over two decades,
              delivering rich, velvety ice cream that is loved across the globe. Scoop Bill represents this heritage, refined
              with a modern twist.
            </p>
          </div>
          <img
            src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d07b_Map%20Bubbles.png"
            loading="eager"
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 940px"
            srcSet="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d07b_Map%2520Bubbles-p-500.png 500w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d07b_Map%2520Bubbles-p-800.png 800w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d07b_Map%2520Bubbles-p-1080.png 1080w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6585c48ebdda2e1921a0d07b_Map%20Bubbles.png 1458w"
            alt="map"
            className="image_map-bubbles"
          />
        </div>
      </section>
    </>
  );
}
