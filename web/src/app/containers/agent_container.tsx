'use client';

import React, { useEffect } from 'react';
import { CHILDREN } from '../constants/interfaces';
import { Col, Container, Row } from 'react-bootstrap';
import LeftSideBar from '@/app/components/agent/leftSideBar/leftSidebar';
import { useAuth } from '../contexts/auth_context';
import colors from '@/app/constants/colors';
import AgentProvider from '../contexts/agent_context';

function AgentContainer({ children }: CHILDREN) {
    const { authState } = useAuth();

    useEffect(() => {
        if (authState.user.is_agent && authState?.user?.agent?.name)
            document.title = authState.user.agent.name;
    });

    if (!(authState.authenticated && authState.user.is_agent))
        return <div>Bạn phải đăng nhập bằng tài khoản đối tác</div>;

    return (
        <AgentProvider>
            <Container fluid style={{ backgroundColor: colors.background }}>
                <Row>
                    <Col sm={2} className="p-0">
                        <LeftSideBar />
                    </Col>
                    <Col className="p-0">{children}</Col>
                </Row>
            </Container>
        </AgentProvider>
    );
}

export default AgentContainer;
