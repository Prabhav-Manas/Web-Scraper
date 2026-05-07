import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const VerifyEmail = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const hasVerified = useRef(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Prevent double API call in React StrictMode
        if (hasVerified.current) return;

        hasVerified.current = true;

        const verifyUserEmail = async () => {
            try {

                const token = searchParams.get('token');

                if (!token) {
                    setError('Verification token is missing!');
                    return;
                }

                const response = await authService.verifyEmail(token);

                setMessage(response.message);

                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    'Email verification failed.'
                );

            } finally {
                setLoading(false);
            }
        };

        verifyUserEmail();

    }, [searchParams, navigate]);

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow border-0 p-4 text-center" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="fw-bold text-primary mb-3">
                    Email Verification
                </h2>

                {loading && (
                    <>
                        <div className="spinner-border text-primary mb-3"></div>
                        <p>
                            Please wait while we verify your email...
                        </p>
                    </>
                )}

                {!loading && message && (
                    <div className="alert alert-success">
                        <h5>{message}</h5>

                        <p className="mb-0">
                            Redirecting to login page...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="alert alert-danger">
                        <h5>{error}</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;