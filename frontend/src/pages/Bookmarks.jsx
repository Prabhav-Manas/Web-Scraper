import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import storyService from '../services/storyService';
import StoryList from '../components/stories/StoryList';

const Bookmarks = () => {
    const { user } = useAuth();
    const [bookmarkedStories, setBookmarkedStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                setLoading(true);
                const data = await storyService.getAllStories();
                const bookmarks = data.stories.filter((story) =>
                    user?.bookmarks?.includes(story._id)
                );
                setBookmarkedStories(bookmarks);
            } catch (error) {
                setError(err.response?.data?.message || 'Failed to fetch bookmarks.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, []);

    const handleBookmarkToggle = async (storyId) => {
        try {
            await storyService.toggleBookmark(storyId);
            setBookmarkedStories((prev) =>
                prev.filter((story) => story._id !== storyId)
            );
        } catch (error) {
            console.log('Bookmark toggle error:=>', error);
        }
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h4 className="fw-bold mb-0">My Bookmarks</h4>
                
                <small className="text-muted">
                    {bookmarkedStories.length} saved{' '}
                    {bookmarkedStories.length === 1 ? 'story' : 'stories'}
                </small>
            </div>

            <StoryList
                stories={bookmarkedStories}
                loading={loading}
                error={error}
                onBookmark={handleBookmarkToggle}
            />
        </div>
    );
};

export default Bookmarks;