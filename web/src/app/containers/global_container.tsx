'use client';

import React from 'react';
import BackendProvider from '../contexts/backend_context';
import Header from '../components/header/header';
import Navigation from '../components/navigation/navigation';
import Footer from '../components/footer/footer';
import { Container } from 'react-bootstrap';
import AuthProvider from '../contexts/auth_context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

function GlobalContainer({ children }: { children: React.ReactNode }) {
    return (
        <BackendProvider>
            <AuthProvider>
                {/* <Header /> */}
                <Navigation />
                {children}
                <Footer />
                <ToastContainer />
            </AuthProvider>
        </BackendProvider>
    );
}

export default GlobalContainer;
