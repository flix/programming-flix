import React from 'react'

class Welcome extends React.Component {
    render() {
        const style = {textAlign: "center"};
        return (
            <div style={style}>
                Welcome to this interactive tutorial for the <a href="http://flix.github.io/">Flix</a> programming
                language!
            </div>)
    }
}

export default Welcome
