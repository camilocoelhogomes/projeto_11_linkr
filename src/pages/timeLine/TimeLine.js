import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Post from '../../components/Post';
import { getFollowedUsersPosts, getFollowedUsers } from '../../services/API';
import Alert from '../../components/Alert';
import Treding from '../../components/Trending';
import Publish from './Publish';
import SearchInput from '../../components/SearchInput';
import { PageContainer } from '../../components/PageContainer';

export default function TimeLine() {

    const [posts, setPosts] = useState(null);
    const [err, setErr] = useState(null);
    const [followedUsersErr, setFollowedUsersErr] = useState(null);
    const [followedUsers, setFollowedUsers] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const getPosts = () => {
        getFollowedUsersPosts(userInfo.token)
            .then((res) => {
                setErr(false);
                setPosts(res.data.posts);
            })
            .catch(() => setErr(true));
    }

    const defineFollowedUsers = () => {
        getFollowedUsers(userInfo.token)
            .then(ans => {
                setFollowedUsersErr(false);
                setFollowedUsers(ans.data.users)
            }).catch(err => {
                setFollowedUsersErr(true);
            })
    }

    useEffect(() => {
        defineFollowedUsers();
        getPosts();
        const intervalId = setInterval(getPosts, 15000);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    if (!posts) return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <SearchInput />
                    <h2>timeline</h2>
                </header>
            </PageContainer>
        </>
    )

    if (followedUsersErr) {
        return <Alert message={'Não foi possível obter os dados de seus seguidores, por favor recarregue a página'} />
    }

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <SearchInput />
                    <h2>timeline</h2>
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        <Publish loadPosts={getPosts} />
                        {followedUsers.length === 0 ? (
                            <h3 className="posts-message">Você não segue ninguém ainda. Procure por perfis na busca.</h3>
                        ) : (
                            posts.filter(post => post.user.id !== userInfo.user.id).length === 0 ? (
                                <h3 className="posts-message">Seus seguidores não postaram nada ainda!</h3>
                            ) : ("")
                        )}
                        {posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts} />)}
                    </div>
                    <Treding className='trending' />
                </div>
            </PageContainer>
        </>
    );
}