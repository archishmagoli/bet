import supabase from '../client.jsx';
import { useEffect, useState } from 'react';
import '../App.css';

const Posts = () => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
        try {
            const postData = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: true });

            setPosts(postData.data);
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    })

    return (
        <>
            <div>
                {
                    posts !== null ? 
                    posts.map((post, index) => (
                        <div key={index} className='post'>
                            <h2>{post.title}</h2>
                            <i><b>Created: </b>{new Date(post.created_at).toString()}</i>
                            <p>{post.description}</p>
                            <p>{post.betCount} Bets</p>
                            <button className='bet-button'>Bet 👍</button>
                        </div>
                    )) : 'Loading...'
                }
            </div>
        </>
    );
}

export default Posts;