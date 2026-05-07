import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../components/common/FormInput';
import authService from '../services/authService';
import useAuth from '../hooks/useAuth';

const schema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),

    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: yupResolver(schema), mode: 'onChange'});

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setServerError('');
            setSuccessMessage('');

            const response = await authService.login({
                email: data.email,
                password: data.password,
            });

            // Save user and token in context/localStorage
            login(response.user, response.token);

            setSuccessMessage('Login successful! Redirecting...');

            reset();

            setTimeout(() => {
                navigate('/home');
            }, 1500);

        } catch (error) {
            setServerError(
                error.response?.data?.message ||
                'Login failed. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow border-0 p-4" style={{ width: '100%', maxWidth: '460px' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">HackerNews</h2>

                    <p className="text-muted">Login to your account</p>
                </div>

                {serverError && (
                    <div className="alert alert-danger py-2">
                        {serverError}
                    </div>
                )}

                {successMessage && (
                    <div className="alert alert-success py-2">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        register={register('email')}
                        error={errors.email}
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        register={register('password')}
                        error={errors.password}
                        isPassword
                        showPassword={showPassword}
                        togglePassword={() =>
                            setShowPassword(!showPassword)
                        }
                    />

                    <div className="text-end mb-3">
                        <Link to="/forgot-password" className="text-decoration-none small">
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>

                    <p className="text-center text-muted mt-3 mb-0">
                        <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                            Don&apos;t have an account ? Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;