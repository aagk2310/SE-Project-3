import React from "react";
import styled from "styled-components";
import aboutImg from "../assets/images/img-1.jpeg";

const About = () => {
  return (
    <Wrapper className="section">
      <div className="section-center">
        <img src={aboutImg} alt="about-image" />
        <article>
          <div className="title">
            <h2>about us</h2>
            <div className="underline"></div>
          </div>
          <p>
            <strong>Bharat Kalakriti Kendra</strong> is an online platform that
            connects small-town and rural artisans to the broader e-commerce
            market. It helps them create, market, and sell their high-quality
            handicrafts and handmade products, aiming to promote India's
            traditional crafts globally. India has a rich heritage of artisans,
            with unique regional styles, which gives it an edge in the
            international market. With proper support and a business-friendly
            environment, the Indian handicraft market could grow into a
            multi-billion-dollar industry. To make this happen, a plan is needed
            that values traditional craft skills while encouraging new designs
            and manufacturing techniques. As the industry grows, using
            e-commerce to reach more customers and streamline operations will be
            key to success.
          </p>
        </article>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);

  .section-center {
    display: grid;
    place-items: center;
    gap: 4rem;
    img {
      width: 100%;
      display: block;
      border-radius: var(--radius);
      height: 500px;
      object-fit: contain;
    }
    p {
      line-height: 2;
      max-width: 45em;
      margin: 0 auto;
      margin-top: 2rem;
      color: var(--clr-grey-5);
      text-transform: normal;
    }
    .title {
      text-align: left;
    }
    .underline {
      margin-left: 0;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1280px) {
    padding-top: 12rem;
  }
`;

export default About;
