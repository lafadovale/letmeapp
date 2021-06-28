import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    
    const { theme, toggleTheme } = useTheme();
    
    const [roomCode, setRoomCode] = useState('');
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exist.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('This Q&A room has already been ended.');
            return;
        }

        history.push(`/rooms/${roomCode}`);

    }

    return (
        <div id="page-auth" className={theme}>
            <aside>
                <img src={illustrationImg} alt="Illustration symbolizing Q&amp;A" />
                <strong>Create Q&amp;A live rooms</strong>
                <p>Kill in realtime your audience doubts</p>
            </aside>
            <main>
                <div className="main-content">
                    <button onClick={toggleTheme}>Light / Dark</button>
                    <img src={logoImg} alt="LetMeAsk" />                    
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google logo" />
                        Create your room with Google
                    </button>
                    <div className="separator">or join a room</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                         type="text"
                         placeholder="Type the room code"
                         onChange={event => setRoomCode(event.target.value)}
                         value={roomCode}
                        />
                        <Button type="submit">
                            Join the room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}