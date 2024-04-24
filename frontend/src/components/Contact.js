import React from 'react';
import styled from 'styled-components';
import { contactItems } from '../constants/contactConstant';



const Contact = () => {
  return (
    <Container className="section">
      <div className="title">
        <h2>get in touch</h2>
        <div className="underline"></div>
      </div>

      <SectionCenter className="section-center">
        <ContactInfo>
          <p>
            If you have any questions or just want to get in touch,  We look forward to hear from you!
          </p>
          {contactItems.map((item) => (
            <div key={item.id} className="contact-item">
              <span>{item.icon}</span>
              <h5>{item.title}:</h5>
              <p>{item.description}</p>
            </div>
          ))}
        </ContactInfo>

        
      </SectionCenter>
    </Container>
  );
};


const Container = styled.section`
  .title {
    text-align: center;
    margin: 0 auto 2rem;
  }
`;

const SectionCenter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  overflow-x: hidden;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 4rem;
  }
`;

const ContactInfo = styled.article`
  max-width: 592px;
  margin: 0 auto;

  .contact-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 1.5rem 0;

    &:last-child {
      border-bottom: none;
    }

    span {
      font-size: 1.25rem;
      background-color: var(--clr-primary-5);
      color: var(--clr-white);
      padding: 0.35rem 0.7rem;
      margin-right: 0.5rem;
      text-align: center;
      border-radius: 50%;
      height: 3rem;
      width: 3rem;

      svg {
        vertical-align: middle;
      }
    }

    h5,
    p {
      margin-bottom: 0;
    }
  }
`;



export default Contact;
