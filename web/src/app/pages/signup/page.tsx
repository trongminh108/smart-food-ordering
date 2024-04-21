'use client';
import './signup.scss';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

// import accountData from '@/assets/api/account';

function SignUp() {
    useEffect(() => {
        document.title = 'Sign Up';
    });

    const [showPassword, setShowpassword] = useState<Boolean>(false);
    const [username_inp, setUsername_inp] = useState<string>('');
    const [gmail_inp, setGmail_inp] = useState<string>('');
    const [password_inp, setPassword_inp] = useState<string>('');
    const [confirm_pass_inp, setConfirm_pass_inp] = useState<string>('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [userNotExist, setUserNotExist] = useState(true);
    const router = useRouter();

    function handleShowpassword() {
        setShowpassword((prev) => !prev);
    }

    function handlePasswordChange(e: any) {
        setPassword_inp(e.target.value);
        setPasswordsMatch(e.target.value === confirm_pass_inp);
    }

    function handleConfirmPasswordChange(e: any) {
        setConfirm_pass_inp(e.target.value);
        setPasswordsMatch(e.target.value === password_inp);
    }

    async function handleSubmitFormSignUp(e: any) {
        e.preventDefault();
        if (!passwordsMatch) {
            alert('Mật khẩu không trùng khớp, vui lòng thử lại!');
        } else {
            // const isSignUp = await AccountService.signup(
            //     username_inp,
            //     gmail_inp,
            //     password_inp
            // );
            const isSignUp = -1;
            if (isSignUp == -1) {
                setUserNotExist(false);
            } else if (isSignUp == 1) {
                alert('Đăng ký thành công, cảm ơn bạn đã sử dụng trang web!');
                router.replace('/home');
            }
        }
    }

    return (
        <Container className="sign-in-container" fluid>
            <div className="title">Sign Up</div>
            <Form className="form-container" onSubmit={handleSubmitFormSignUp}>
                <div className="d-flex justify-content-center">
                    <Image
                        id={'avatar'}
                        alt="avatar SignUp"
                        className="bg-white rounded-circle"
                        src={'/../../../../images/LogoTGex.png'}
                        width={150}
                        height={150}
                    />
                </div>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label className="text-white fw-bold">
                        Username:
                    </Form.Label>
                    <Form.Control
                        className="rounded-pill ps-3"
                        type="text"
                        placeholder="Enter your username"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUsername_inp(e.target.value);
                            setUserNotExist(true);
                        }}
                        isInvalid={!userNotExist}
                    />
                    <Form.Control.Feedback
                        type="invalid"
                        className="fw-bolder text-dark"
                    >
                        Tên tài khoản đã tồn tại, vui lòng nhập tên khác!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-white fw-bold">
                        Gmail address:
                    </Form.Label>
                    <Form.Control
                        className="rounded-pill ps-3"
                        type="email"
                        placeholder="Enter your gmail"
                        required
                        onChange={(e: any) => setGmail_inp(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
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
                <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                >
                    <Form.Label className="text-white fw-bold">
                        Confirm your password:
                    </Form.Label>
                    <Form.Control
                        className="rounded-pill ps-3"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        onChange={handleConfirmPasswordChange}
                        isInvalid={!passwordsMatch}
                    />
                    <Form.Control.Feedback
                        type="invalid"
                        className="fw-bolder text-dark"
                    >
                        Mật khẩu không trùng khớp!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        className="text-white"
                        type="checkbox"
                        label="Show password"
                        onClick={handleShowpassword}
                    />
                </Form.Group>
                <Button type="submit" className="btn-submit">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;
