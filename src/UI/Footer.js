import styled from 'styled-components';

const DevInfo = styled.footer`
    bottom:0px;
    width: 100%;
    height: 90px;
    text-align: center;

    background: var(--maincolor);
    font-size: 12px;
    color: white;
    padding: 2px;
  `;


const Footer =()=>{
    return (
      <DevInfo>
        <p> [Front Dev] lee, kwon [Back Dev] yoon, lee </p>
        <p>📧 nowwyun@inu.ac.kr</p>
        <strong>Copyright© INU ICT senier project</strong>
      </DevInfo>
    );
}

export default Footer;