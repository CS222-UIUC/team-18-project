import React from 'react'



function Title() {
    return (
        <>
            <header style={styles.header}>
                <h1 style={styles.title}>UIUC Minor Recommender</h1>
            </header>
            
        </>
    );

}

const styles = {
    header: {
        backgroundColor: '#FF5F05',
        color: 'black',
        padding: '10px 20px',
        textAlign: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        
    },
    title: {
        color: 'black',
        fontSize: '2.5rem',
        margin: '0',
        fontWeight: 'bold',
        fontFamily: 'Merriweather, sans-serif',
        letterSpacing: '1.5px',
    },
    subtitle: {
        backgroundColor: '#FF5F05',
        width: '50%', 
        marginLeft: 'auto', 
        marginRight: 'auto',
        borderRadius: '50px', 
        padding: '20px 60px',
        width: 'fit-content',
        color: '#333',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Merriweather, sans-serif',
        marginTop: '50px',
        marginBottom: '50px',
    },
};

export default Title;