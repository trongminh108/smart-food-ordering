'use client';
import './signin.scss';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/auth_context';
// import AccountService from '@/assets/service/account';
import { parseJwt } from '@/app/modules/feature_function';

function SignIn() {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [username_inp, setUsername_inp] = useState<string>('');
    const [password_inp, setPassword_inp] = useState<string>('');
    const router = useRouter();

    const { onLogin } = useAuth();

    useEffect(() => {
        document.title = 'Sign in account';
    }, []);

    function handleShowpassword() {
        setShowPassword((prev) => !prev);
    }

    const handleUsernameChange = (e: any) => {
        setUsername_inp(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword_inp(e.target.value);
    };

    async function handleSubmitForm(e: any) {
        e.preventDefault();
        try {
            const { user } = await onLogin(username_inp, password_inp);
            if (user != null) {
                alert(`Login success, hello: ${user.full_name}`);
                if (user.is_agent) router.replace('/pages/agent');
                else if (user.is_deliver) router.replace('/pages/deliver');
                else router.replace('/pages/home');
            } else alert('Login fail');
        } catch (err: any) {
            alert('Login fail');
            console.error('Login error:', err.message);
        }
    }

    return (
        <Container className="sign-in-container" fluid>
            <div className="title">Login</div>
            <Form className="form-container" onSubmit={handleSubmitForm}>
                <div className="d-flex justify-content-center">
                    <Image
                        id={'avatar'}
                        alt="avatar signin"
                        className="bg-white rounded-circle"
                        src={require('@/assets/images/LogoTGex.png')}
                        width={150}
                        height={150}
                    />
                </div>
                <Form.Group className="mb-3" controlId="formSigninEmail">
                    <Form.Label className="text-white fw-bold">
                        username:
                    </Form.Label>
                    <Form.Control
                        className="rounded-pill ps-3"
                        type="text"
                        placeholder="Enter your email or username"
                        required
                        onChange={handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSigninPassword">
                    <Form.Label className="text-white fw-bold">
                        Password:
                    </Form.Label>
                    <Form.Control
                        className="rounded-pill ps-3"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSigninCheckbox">
                    <Form.Check
                        className="text-white"
                        type="checkbox"
                        label="Show password"
                        onClick={handleShowpassword}
                    />
                </Form.Group>
                <Button type="submit" className="btn-submit">
                    Sign In
                </Button>
            </Form>
        </Container>
    );
}

export default SignIn;
