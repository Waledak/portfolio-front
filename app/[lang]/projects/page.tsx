import {ReactElement} from "react";

export default function projectsPage(): ReactElement {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                padding: '1rem',
            }}
        >
            <h1>Work In Progress</h1>
            <p>
                Cette page est en cours de développement. Revenez bientôt pour découvrir nos nouveautés !
            </p>
        </div>
    );
}