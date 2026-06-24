export const metadata = {
  title: 'Minimelts Egypt - About us',
  description: 'Brought to Egypt by Mini for food manufacturing; we have adopted the global standards and process of delivering Minimelts to different markets around the globe.',
};

export default function AboutUsPage() {
  return (
    <>
      {/* Small Hero */}
      <section className="section_small-hero">
        <h1 className="small-hero_heading is-light-blue">About us</h1>
        <div className="small-hero_image is-about-us"></div>
      </section>

      {/* Minimelts Worldwide */}
      <section className="section_minimelts-worldwide padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="horizontal-flex-container mobile-vertical">
            <div className="section-content_text-wrapper is-40 mobile-100">
              <h2 className="text-color-light-blue">Minimelts Worldwide</h2>
              <p className="text-size-medium text-weight-medium text-color-light-blue">
                Setting a new trend in ice-cream making, Minimelts is now popular with kids and adults, alike, winning
                thousands of raving fans across the world, and making other brands follow in our footsteps.
                <br />
                <br />
                Another fun fact is that Minimelts preserve its natural flavor, adding no air, and no water, just real
                cream made of the super-premium ingredients.
              </p>
            </div>
            <div className="minimelts-worldwide_image-container">
              <img
                src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586dd7d11cda3517e9c7523_Yellow%20Dotted%20Circle.svg"
                loading="lazy"
                alt=""
                className="minimelts-worldwide_yellow-dotted-circle"
              />
              <img
                src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586fa46f578bcebae682021_Minimelts%20Worldwide.png"
                loading="eager"
                sizes="(max-width: 479px) 93vw, (max-width: 767px) 94vw, (max-width: 991px) 56vw, (max-width: 1439px) 41vw, (max-width: 1919px) 40vw, 38vw"
                srcSet="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586fa46f578bcebae682021_Minimelts%20Worldwide-p-500.png 500w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586fa46f578bcebae682021_Minimelts%20Worldwide-p-800.png 800w, https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586fa46f578bcebae682021_Minimelts%20Worldwide.png 980w"
                alt="Minimelts Worldwide"
                className="image_minimelts-worldwide"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Minimelts Egypt */}
      <section className="section_minimelts-egypt padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="horizontal-flex-container mobile-vertical flipped">
            <div className="minimelts-egypt_image-container">
              <img
                src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586fcb907c29a40840b243b_Minimelts%20Egypt%20Map%20Logo.svg"
                loading="lazy"
                alt="Minimelts Egypt Map Logo"
                className="minimelts-egypt_map-tag"
              />
              <img
                src="https://cdn.prod.website-files.com/6585c0cabac3e77d01299d7f/6586fbf3cbffc868f381eaa9_Minimelts%20Egypt%20Map.svg"
                loading="lazy"
                alt="Minimelts Egypt Map"
                className="image_minimelts-egypt"
              />
            </div>
            <div className="section-content_text-wrapper is-50 mobile-100">
              <h2 className="text-color-white">Minimelts Egypt</h2>
              <p className="text-size-medium text-weight-medium text-color-white">
                Brought to Egypt by Mini for food manufacturing; we have adopted the global standards and process of
                delivering Minimelts to different markets around the globe.
                <br />
                <br />
                Minimelts' unique, superior flavors are enhanced by being stored and served at an extremely low temperature,
                which creates an outstanding cold sensation while the ice-cream melts in your mouth...
                <br />
                <br />
                "FYI" Minimelts is not just an ice-cream, it is an unparalleled state of happiness that happens in your mouth. Yummy!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini for Food Manufacturing */}
      <section className="section_mini-food-manufacturing padding-section-medium">
        <div className="w-layout-blockcontainer container-large w-container">
          <div className="section-content_text-wrapper is-100">
            <h2 className="text-color-light-blue">Mini for food manufacturing</h2>
            <p className="text-size-medium text-weight-medium text-color-light-blue">
              We, at Minimelts Egypt for Food Manufacturing have always believed in setting new standards in the service and
              the F&B sectors, at large.
              <br />
              <br />
              That is to say, mini got initially created to generate happiness and joyful moments via its wide array of "mini"
              products. Meaning, a number of mini things that make you feel jubilant can lead to a big joyful mood in your
              heart, as indulging in Minimelts, dissimilar bites of happiness throughout the day is better than getting
              stuck with merely one big, boring choice.
              <br />
              <br />
              Mini was born to help these up-and-coming generations shrink their potential option set down to a more manageable
              size. With that being said, mini takes immense pride in launching its first brand Minimelts, the world's
              coolest, extraordinarily popular ice-cream, for the first time in the Egyptian market.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
