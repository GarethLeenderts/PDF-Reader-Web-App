import React from 'react';
import './ViewingWindow.css';

const ViewingWindow = ({ post }) => {

    return (
        <div className="container">
            <div className="window">
                {post.visionApiOutputText}
            </div>
        </div>
    );
};

export default ViewingWindow;