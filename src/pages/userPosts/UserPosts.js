import React, { useEffect, useState } from "react";
import { getUserPosts, getFollowedUsers, followUser, unfollowUser } from "../../services/API";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Post from '../../components/Post';
import Header from '../../components/Header';
import Trending from "../../components/Trending";
import Alert from '../../components/Alert';

export default function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(null);
    const { id } = useParams();
    const [isFollowed, setIsFollowed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const history = useHistory();

    const getPosts = () => { 
        const isUser = (Number(id) === userInfo.user.id);
        if (isUser) {
            history.push('/my-posts');
        } else {
            getUserPosts({token: userInfo.token, id})
            .then(res => {
                setPosts(res.data.posts);
            })
            .catch(() => setErr(true));
        }
    }

    const defineFollowedUsers = () => {
        getFollowedUsers(userInfo.token).then(ans => {
            setIsLoading(false);
            if (ans.data.users.find(user => user.id === Number(id))) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }).catch(err => {
            alert("Não foi possível saber se você segue ou não o usuário! Por favor, recarregue a página.");
        })
    }

    useEffect(() => {
        getPosts();
        const intervalId = setInterval(getPosts, 15000);
        defineFollowedUsers();
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const follow = () => {
        setIsFollowed(true);
        followUser(id, userInfo.token).then(ans => {
            console.log(ans.data);
        }).catch(err => {
            setIsFollowed(false);
        })
    }

    const unfollow = () => {
        setIsFollowed(false);
        unfollowUser(id, userInfo.token).then(ans => {
            console.log(ans.data);
        }).catch(err => {
            setIsFollowed(true);
        })
    }

    if (err) {
        return <Alert message={'Não foi possível carregar os posts, por favor recarregue a página'} />
    }

    return (
        <>
            <Header />
            <PageContainer>
                <header>
                    <h2>{posts.length > 0 ? posts[0].user.username : ""}'s posts</h2>
                    {isLoading ? (
                        <LoadingButton>Loading...</LoadingButton>
                    ) : (
                        isFollowed ? (
                            <StyledFollowButton backgroundColor={"#ffffff"} textColor={"#1877F2"} onClick={unfollow}>Unfollow</StyledFollowButton>
                        ) : (
                            <StyledFollowButton backgroundColor={"#1877F2"} textColor={"#ffffff"} onClick={follow}>Follow</StyledFollowButton>
                        )
                    )}
                </header>
                <div className='main-content'>
                    <div className='posts'>
                        {posts.length === 0 ? <h2>Nenhum post encontrado</h2> :
                            posts.map(post => <Post key={post.id} post={post} userInfo={userInfo} getPosts={getPosts}/>)
                        }
                    </div>
                    <Trending className='trending' />
                </div>
            </PageContainer>
        </>
    );
}

const PageContainer = styled.div`
    margin: 0 auto;
    max-width: 1042px;
    position: relative;
    header {
        width: 100vw;
        margin: 125px 0 43px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .posts{
        display: flex;
        flex-direction: column;
        gap: 16px; 
    }

    .main-content{
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    @media(max-width: 900px){
        .posts{
            width: 100%;
        }
    }
`
const StyledFollowButton = styled.button`
    width: 112px;
    height: 31px;
    background-color: ${({backgroundColor}) => backgroundColor};
    color: ${({textColor}) => textColor};
    font-size: 14px;
    border: none;
    line-height: 17px;
    font-weight: bold;
    border-radius: 5px;
`
const LoadingButton = styled.div`
    width: 112px;
    height: 31px;
    background-color: gray;
    color: #ffffff;
    opacity: 0.7;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`