import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function NewRoom() {
    // const { user } = useAuth();
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustration symbolizing Q&amp;A" />
                <strong>Create Q&amp;A live rooms</strong>
                <p>Kill in realtime your audience doubts</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Create a new room</h2>
                    <form>
                        <input
                         type="text"
                         placeholder="Room name"
                        />
                        <Button type="submit">
                            Create room
                        </Button>
                    </form>
                    <p>
                        Do you want to join in an existing room? <Link to="/">Click here</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}