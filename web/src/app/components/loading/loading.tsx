import React from 'react';
import { Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../loading_spinner/loading_spinner';

interface LOADING {
    loading?: boolean;
    message?: string;
}

function Loading({ loading = true, message = '' }: LOADING) {
    return (
        <Container
            fluid
            className="d-flex w-100 h-100 d-flex flex-column gap-3 justify-content-center align-items-center"
        >
            {loading && (
                <Row>
                    <LoadingSpinner />
                </Row>
            )}
            <Row className="fw-bold">{message}</Row>
        </Container>
    );
}

export default Loading;
