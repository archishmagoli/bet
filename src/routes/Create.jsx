import { useState } from 'react';
import '../App.css';
import supabase from '../client.jsx';

const Create = () => {
    const [bet, setBet] = useState({
        title: '',
        author: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createBet();
    }

    const createBet = async () => {
        try {
            const { data, error } = await supabase
            .from('Posts')
            .insert({ 
                    title: bet.title,
                    author: bet.author,
                    description: bet.description 
                });

            if (error) {
                throw error;
            }

            alert('Bet created successfully!');
            window.location = '/';

        } catch (error) {
            console.error(error);
            alert('Error creating bet.');
        }
    };

    const handleChange= (e) => {
        e.preventDefault();
        setBet({
            ...bet,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='create-form'>
            <h2>Create a Bet</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='title'>Bet title:</label>
                <br />
                <input type='text' className='text' id='title' name='title' value={bet.title} onChange={handleChange} required />
                <br />
                <br />
                <label htmlFor='author'>Author name:</label>
                <br />
                <input type='text' className='text' id='author' name='author' value={bet.author} onChange={handleChange} required />
                <br />
                <br />
                <label htmlFor='description'>Bet description:</label>
                <br />
                <textarea id='description' className='text' name='description' value={bet.description} onChange={handleChange} required></textarea>
                <br />
                <br />
                <button type='submit'>Create Bet 🏆</button>
            </form>
        </div>
    )
}

export default Create;