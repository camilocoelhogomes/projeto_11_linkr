import React, { useEffect, useState } from "react";
import { getUserPosts } from "../../services/API";
import { useParams, useHistory } from "react-router-dom";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from '../../components/Alert';
import { PageContainer } from "../shared/styled-components/PageContainer";

export default function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(null);
    const { id } = useParams();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    const getPosts = () => { 
        const isUser = (Number(id) === userInfo.user.id);
        if (isUser) {
            history.push('/my-posts');
        }     
        getUserPosts({token: userInfo.token, id})
            .then( res => {
                setPosts(res.data.posts)
                if (!!res.data.posts[0].repostedBy) {
                    setUsername(res.data.posts[0].repostedBy.username);
                } else {
                    setUsername(res.data.posts[0].user.username);
                }
            })
            .catch(() => setErr(true));
    }

    useEffect(() => {
        getPosts();
        const intervalId =  setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, [id]);

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <h2>{username}'s posts</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        {posts.length === 0 ? <h2>Nenhum post encontrado</h2> :
                            posts.map((post, index) => <Post key={index} post={post} userInfo={userInfo} getPosts={getPosts}/>)
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    );
}