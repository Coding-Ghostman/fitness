import styled from "styled-components";
import TextAnimation from "../Animation/TextAnimation";
import FoodDesign from "./FoodDesign";
import Link from "../link/Link";

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
    display: flex;
    z-index: 5;
    background: url("./img/bg3.jpg");
    background-size: cover;
    justify-content: center;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
        background: linear-gradient(to right, #082028, #0f3e4e);
    }
`;

const Container = styled.div`
    height: 100%;
    scroll-snap-align: center;
    width: 1400px;
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    z-index: 5;
    @media only screen and (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const Left = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        flex: 1;
        align-items: center;
    }
`;

const Title = styled.h1`
    font-size: 68px;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        text-align: center;
    }
`;

const Desc = styled.p`
    font-size: 24px;
    color: lightgray;
    z-index: 5;
    @media only screen and (max-width: 768px) {
        padding: 20px;
        text-align: center;
    }
`;

const Button = styled.button`
    background-color: #da4ea2;
    color: white;
    font-weight: 500;
    width: 120px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Right = styled.div`
    flex: 3;
    position: relative;
    @media only screen and (max-width: 768px) {
        flex: 1;
        width: 100%;
    }
`;

function About({ handleClick }) {
    return (
        <Section>
            <Container>
                <Left>
                    <Title className="font-mono font-bold">
                        <TextAnimation>YOUR PERSONALIZED</TextAnimation>
                        <TextAnimation>PATH TO A HEALTHIER</TextAnimation> <span className="text-gradient font-mono -ml-2">LIFESTYLE</span>
                    </Title>
                    <Desc>Take control of your health journey today with our diet and fitness planner.</Desc>
                    <div className="flex flex-row gap-6">
                        <Link to="/dietplan">
                            <Button className="interactable" onClick={handleClick}>
                                Diet
                            </Button>
                        </Link>
                        <Link to="/fitnessplan">
                            <Button className="interactable" onClick={handleClick}>
                                Fitness
                            </Button>
                        </Link>
                    </div>
                </Left>

                <Right>
                    <FoodDesign />
                </Right>
            </Container>
        </Section>
    );
}
export default About;

/* <div>
    <ImgBack src="./img/yoga_back.png" />
    <ImgFront src="./img/yoga_front.png" />
    <ImgObjects src="./img/yoga_objects.png" />
</div>; */