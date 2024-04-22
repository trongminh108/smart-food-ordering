import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './home.css';

function HomePage() {
    return (
        <Container
            fluid
            className="homePage flex-column d-flex mt-5 align-items-center gap-5 fw-bold h2"
        >
            <Row>
                <Col>{`Smart Food Ordering (SFO)`}</Col>
            </Row>
            <Row>
                <Col>{`Lưu Minh Trọng - DTH206038`}</Col>
            </Row>
        </Container>
    );
}

export default HomePage;
