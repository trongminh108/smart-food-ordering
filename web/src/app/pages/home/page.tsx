import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './home.css';

function HomePage() {
    return (
        <Container fluid className="homePage">
            <Row>
                <Col>This is home page</Col>
            </Row>
        </Container>
    );
}

export default HomePage;
