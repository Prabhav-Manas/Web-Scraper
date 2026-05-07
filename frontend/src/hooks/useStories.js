import { useState, useEffect } from 'react';
import storyService from '../services/storyService';

const useStories = (page = 1, limit = 10) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                setLoading(true);

                const data = await storyService.getAllStories(page, limit);

                setStories(data.stories);
                
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch stories.');
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, [page, limit]);

    const toggleBookmark = async (storyId) => {
        try {
            const data = await storyService.toggleBookmark(storyId);

            setStories((prev) => prev.map((story) => story._id === storyId ? { ...story, isBookmarked: data.isBookmarked } : story));
        } catch (error) {
            console.log('Bookmark error:=>', error);
        }
    };

    return { stories, loading, error, totalPages, toggleBookmark };
};

export default useStories;