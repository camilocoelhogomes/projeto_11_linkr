import { useContext, useEffect, useState } from "react";
import { getLikedPosts } from "../../services/API";
import UserContext from "../../store/UserContext";
import Post from '../../components/Post';
import styled from "styled-components";
import Header from '../../components/Header';

export default function LikedPosts() {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        getLikedPosts({toke: user.token})
            .then( res => setPosts(res.data.posts.filter(post => post.likes.includes({"id": user.id}))));
    }, []);

    return(
        <PageContainer>
            <header>
                <h2>my likes</h2>
            </header>
            {
                posts.map(post => <Post key={post.id} post={post} />)
            }
        </PageContainer>
    );
}

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    header {
        margin: 53px 0 43px 0;
    }
`;