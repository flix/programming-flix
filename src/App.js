import React from 'react'
import _ from 'lodash/fp'

import AceEditor from 'react-ace'
import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import { LinearProgress } from 'material-ui/Progress'

import 'brace/mode/java'
import 'brace/theme/github'

let websocket

class App extends React.Component {
    state = {
        input: 'def f(): Int = 42',
        output: {
            status: '',
            result: ''
        },
        waiting: false
    }

    componentDidMount () {
        websocket = new window.WebSocket('ws://localhost:8085')
        websocket.onmessage = event => {
            this.setState({ waiting: false, output: JSON.parse(event.data) })
        }
    }

    handleSendMessage = _.debounce(1000, () => {
        this.setState({ waiting: true }, () => {
            websocket.send(this.state.input)
        })
    })

    render () {
        return (
            <Grid container={true} spacing={24}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <AceEditor
                            style={{ width: '100%', height: '100px' }}
                            mode='java'
                            theme='github'
                            onChange={input => this.setState({ input }, this.handleSendMessage)}
                            value={this.state.input}
                            editorProps={{ $blockScrolling: true }} />
                        {this.state.waiting && <LinearProgress />}
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <p>Status: {this.state.output.status}</p>
                            <p>Result: {this.state.output.result}</p>
                            <p>Result: {this.state.output.message}</p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default App