'use client';

import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

import AgentContainer from '@/app/containers/agent_container';
import { useAuth } from '@/app/contexts/auth_context';

function AgentPage() {
    return (
        <Container>
            <Row>AgentPage</Row>
            <Row></Row>
        </Container>
    );
}

export default AgentPage;
