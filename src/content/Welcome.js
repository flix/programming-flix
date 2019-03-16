import React from 'react'
import Container from "reactstrap/es/Container";

class Welcome extends React.Component {
    render() {
        const style = {textAlign: "center", marginBottom: "2.5em"};
        return (
            <Container style={style}>
                <div className="title">Programming Flix</div>

                Welcome to this interactive tutorial for the <a href="https://flix.dev">Flix</a> programming language!
            </Container>)
    }
}

export default Welcome
