import getVideoId from 'get-video-id';

const isYouTube = ({ link }) => getVideoId(link);


const isImg = ({ img }) => typeof (img) === 'string' ? img.match(/\.(jpeg|jpg|gif|png)$/) != null : false;

export { isYouTube, isImg };