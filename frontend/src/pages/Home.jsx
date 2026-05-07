import { useState } from 'react';
import useStories from '../hooks/useStories';
import useAuth from '../hooks/useAuth';
import StoryList from '../components/stories/StoryList';

const Home = () => {
    const [page, setPage] = useState(1);
    const { stories, loading, error, totalPages, toggleBookmark } = useStories(page);
    const { user } = useAuth();

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-0">Top Stories</h4>
                    <small className="text-muted">From Hacker News</small>
                </div>
            </div>

            <StoryList
                stories={stories}
                loading={loading}
                error={error}
                onBookmark={toggleBookmark}
            />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 gap-2">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        ← Prev
                    </button>

                    <span className="btn btn-warning btn-sm disabled">
                        {page} / {totalPages}
                    </span>
                    
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;