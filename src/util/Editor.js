import React, {Component} from 'react';
import nl2br from 'react-newline-to-break';
import AceEditor from 'react-ace'
import 'brace/mode/scala'
import {Button, ButtonGroup, Card, CardText} from "reactstrap";

import FlixMode from './FlixMode'
import 'brace/theme/chrome';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            input: this.props.children,
            output: undefined,
            waiting: false
        }
    }

    componentDidMount() {
        const customMode = new FlixMode();
        this.refs.aceEditor.editor.getSession().setMode(customMode);
    }

    run = () => {
        this.setState({waiting: true}, () => {
            let src = this.state.input;

            this.props.flix.run(src, data =>
                this.setState({waiting: false, output: data})
            );
        })
    };

    onChange = input => {
        this.setState({input: input});
    };

    onRunClick = () => {
        this.run();
    };

    onResetClick = () => {
        this.setState(this.getInitialState())
    };

    resultBox = () => {
        if (!this.state.output) {
            return undefined;
        } else {
            if (this.state.output.status === "success") {
                return (
                    <Card body outline color="success" className="mt-2">
                        <CardText>
                            <div className="editor-result">{this.state.output.result}</div>
                        </CardText>
                    </Card>);
            } else {
                return (
                    <Card body outline color="danger" className="mt-2">
                        <CardText>
                            <code>
                                {nl2br(this.state.output.result)}
                            </code>
                        </CardText>
                    </Card>);
            }
        }
    };

    render() {
        return (
            <div className="editor-frame">
                <div>
                    <div className="editor">
                        <AceEditor
                            mode='text'
                            theme='chrome'
                            ref="aceEditor"
                            showGutter={false}
                            showPrintMargin={false}
                            highlightActiveLine={false}
                            onChange={this.onChange}
                            value={this.state.input}
                            autoScrollEditorIntoView={true}
                            minLines={1}
                            maxLines={20}
                            editorProps={{$blockScrolling: true}}/>
                        {this.state.waiting}
                    </div>

                    <ButtonGroup>
                        <Button color="secondary" size="sm" outline className="btn-xs" onClick={this.onRunClick}>Run Main</Button>
                        <Button color="secondary" size="sm" outline className="btn-xs" onClick={this.onResetClick}>Reset</Button>
                    </ButtonGroup>
                </div>
                {this.resultBox()}
            </div>
        )
    }
}

export default Editor
