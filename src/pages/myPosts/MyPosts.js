import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../../services/API";
import UserContext from "../../store/UserContext";
import Post from '../../components/Post';
import styled from "styled-components";
import Header from '../../components/Header';

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        getUserPosts({toke: user.token, id: user.user.id})
            .then( res => setPosts(res.data.posts));
    }, []);

   const posts = serverPosts.posts;

    return(
        <PageContainer>
            <header>
                <h2>my posts</h2>
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