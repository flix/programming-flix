import React from 'react'
import {Col, Row} from "reactstrap";
import Container from "reactstrap/es/Container";

class Section extends React.Component {
    render() {
        return (
            <Container className="asection">
                <Row>
                    <Col>
                        <h1>{this.props.name}</h1>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Section
