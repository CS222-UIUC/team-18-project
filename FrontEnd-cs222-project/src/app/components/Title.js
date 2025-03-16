import React from 'react'



function Title() {
    return (<header style={styles.header}>
    <h1> UIUC Minor Recommender </h1>
    </header>);
}

const styles = {
    header: {
        backgroundColor: '#FF5F05',
        color: 'black',
        padding: '10px 20px',
        textAlign: 'center',
    },
};

export default Title;