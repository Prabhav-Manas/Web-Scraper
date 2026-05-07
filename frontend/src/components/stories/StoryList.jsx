import StoryCard from './StoryCard';
import Loader from '../common/Loader';

const StoryList = ({ stories, loading, error, onBookmark }) => {
    if (loading) return <Loader message="Fetching stories..." />;

    if (error) return (
        <div className="alert alert-danger text-center">{error}</div>
    );

    if (!stories || stories.length === 0) return (
        <div className="alert alert-info text-center">No stories found.</div>
    );

    return (
        <div>
            {stories.map((story) => (
                <StoryCard
                    key={story._id}
                    story={story}
                    onBookmark={onBookmark}
                />
            ))}
        </div>
    );
};

export default StoryList;