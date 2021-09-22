import React, { useEffect, useState } from 'react';
import StyledTimeLine from './StyledTimeLine';
import Header from '../../components/Header';
import Post from '../../components/Post';
import { getFollowedUsersPosts, getFollowedUsers } from '../../services/API';
import Alert from '../../components/Alert';
import Treding from '../../components/Trending';
import Publish from './Publish';

export default function TimeLine() {

    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const [followedUsers, setFollowedUsers] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getFollowedUsersPosts(userInfo.token)
            .then((res) => { 
                setErr(false); setPosts(res.data.posts);
                console.log(res.data)
            })
            .catch(() => setErr(true))
    }

    const defineFollowedUsers = () => {
        getFollowedUsers(userInfo.token)
            .then(ans => {
                console.log(ans.data)
                setFollowedUsers(ans.data.users)
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPosts();
        defineFollowedUsers();
        const intervalId =  setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    if (!posts) return (
        <>
            <Header />
            <StyledTimeLine>
                <header>
                    <h2>timeline</h2>
                </header>
            </StyledTimeLine>
        </>
    )

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <StyledTimeLine>
                <header>
                    <h2>timeline</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        <Publish loadPosts={getPosts} />
                        {followedUsers.length === 0 ? (
                            <h3>Você não segue ninguém ainda. Procure por perfis na busca.</h3>
                        ) : (
                            posts.length === 0 ? (
                                <h2>Nenhum post encontrado</h2>
                            ) : ("")
                        )}
                        {posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)}
                    </div>
                    <Treding className='trending' />
                </div>
            </StyledTimeLine>
        </>
    );
}