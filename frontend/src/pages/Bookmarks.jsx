import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import storyService from '../services/storyService';
import StoryList from '../components/stories/StoryList';
import Loader from "../components/common/Loader";

const Bookmarks = () => {
    const { user } = useAuth();
    const [bookmarkedStories, setBookmarkedStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            const stories = await storyService.getBookmarkedStories();
            setBookmarkedStories(stories);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch bookmarks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const handleBookmarkToggle = async (storyId) => {
        try {
            await storyService.toggleBookmark(storyId);
            // Remove from list immediately after unbookmarking
            setBookmarkedStories((prev) =>
                prev.filter((story) => story._id !== storyId)
            );
        } catch (error) {
            console.log('Bookmark toggle error:=>', error);
        }
    };

    if (loading) return <Loader message="Fetching your bookmarks..." />;

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h4 className="fw-bold mb-0">My Bookmarks</h4>

                <small className="text-muted">
                    {bookmarkedStories.length} saved{' '}
                    {bookmarkedStories.length === 1 ? 'story' : 'stories'}
                </small>
            </div>

            {error && (
                <div className="alert alert-danger">{error}</div>
            )}

            <StoryList
                stories={bookmarkedStories}
                loading={false}
                error={null}
                onBookmark={handleBookmarkToggle}
            />
        </div>
    );
};

export default Bookmarks;