import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from '../components/common/FormInput';
import authService from '../services/authService';

const schema = yup.object({
    userName: yup
        .string()
        .min(2, 'Username must be at least 2 characters')
        .required('Username is required'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
});

const Register=()=>{
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }} = useForm({ resolver: yupResolver(schema), mode: 'onChange', mode: 'onChange' });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setServerError('');
            const response = await authService.register({
                userName: data.userName,
                email: data.email,
                password: data.password,
            });
            setSuccessMessage(response.message);
            
            reset();

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setServerError(
                error.response?.data?.message || 'Registration failed. Please try again.'
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
                    <p className="text-muted">Create your account</p>
                </div>

                {serverError && (
                    <div className="alert alert-danger py-2">{serverError}</div>
                )}

                {successMessage && (
                    <div className="alert alert-success py-2">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormInput
                        label="Username"
                        name="userName"
                        placeholder="Enter your username"
                        register={register('userName')}
                        error={errors.userName}
                    />

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
                        togglePassword={() => setShowPassword(!showPassword)}
                    />

                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        register={register('confirmPassword')}
                        error={errors.confirmPassword}
                        isPassword
                        showPassword={showConfirmPassword}
                        togglePassword={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    />

                    <button type="submit" className="btn btn-primary w-100 fw-bold mt-2" disabled={isLoading}>
                        {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Registering...
                        </>
                        ) : (
                            'Register'
                        )}
                        </button>

                    <p className="text-center text-muted mt-3 mb-0">
                        <Link to="/login" className="text-primary fw-semibold">
                            Already have an account ? Login
                        </Link>
                    </p>
                </form>
                
            </div>
        </div>
    );
}

export default Register