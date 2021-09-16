import { useContext, useEffect, useState } from "react";
import { getUserPosts } from "../../services/API";
import UserContext from "../../store/UserContext";
import Post from '../../components/Post';
import styled from "styled-components";
import Header from '../../components/Header';
import { useParams } from "react-router-dom";

export default function UserPosts() {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(UserContext);
    const id = useParams();

    useEffect(() => {
        getUserPosts({toke: user.token, id})
            .then( res => setPosts(res.data.posts));
    }, []);

    return(
        <PageContainer>
            <header>
                <h2>{posts[0].user.username}'s posts</h2>
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