import useAuth from '../../hooks/useAuth';
import formatTime from '../../utils/formatTime';

const StoryCard = ({ story, onBookmark }) => {
    const { user } = useAuth();

    const isBookmarked = story.isBookmarked;

    return (
        <div className="card mb-3 shadow-sm border-0">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1 me-3">
                        
                        <a href={story.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                            <h6 className="card-title fw-bold text-dark mb-1">
                                {story.title}
                            </h6>
                        </a>

                        <div className="d-flex flex-wrap gap-3 mt-2">
                            <span className="badge bg-warning text-dark">
                                ▲ {story.points} pts
                            </span>

                            <span className="text-muted small">
                                👤 {story.author}
                            </span>

                            <span className="text-muted small">
                                🕐 {formatTime(story.postedAt)}
                            </span>
                        </div>
                    </div>

                    {user && (
                        <button 
                            className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline-secondary'}`}
                            onClick={() => onBookmark(story._id)}
                            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                        >
                            {isBookmarked ? '🔖' : '🔖'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryCard;