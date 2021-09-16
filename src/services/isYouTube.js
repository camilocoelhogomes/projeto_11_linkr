import getVideoId from 'get-video-id';

const isYouTube = ({ link }) => {
    return getVideoId(link);
}

export default isYouTube;