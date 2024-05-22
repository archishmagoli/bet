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
    }, []);

    const addBet = (e) => {
        e.preventDefault();
        const postId = e.target.id;

        updateBetCount(postId);
    }

    const updateBetCount = async (postId) => {
        try {
            const betCount = (await supabase
            .from('Posts')
            .select('betCount')
            .eq('id', postId)).data[0].betCount;

            try {
                const { updateData, updateError } = await supabase
                .from('Posts')
                .update({ betCount: betCount + 1 })
                .eq('id', postId);

                if (updateError) {
                    throw updateError;
                }

            } catch (error) {
                console.error(error);
                alert('Error updating bet count.');
            }

            fetchPosts();

        } catch (error) {
            alert('Error fetching bet count.');
            console.error(error);
        }
    }

    return (
        <>
            <div className='post-gallery'>
                {
                    posts !== null ? 
                    posts.map((post, index) => (
                        <div key={index} className='post'>
                            <h2>{post.title}</h2>
                            <h3>by {post.author}</h3>
                            <p><i><b>Created: </b>{new Date(post.created_at).toString()}</i></p>
                            <p>{post.description}</p>
                            <p>{post.betCount} Bets</p>
                            <button id={post.id} className='bet-button' onClick={addBet}>Bet 👍</button>
                        </div>
                    )) : 'Loading...'
                }
            </div>
        </>
    );
}

export default Posts;