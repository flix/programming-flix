import React, {Component} from 'react';
import AceEditor from 'react-ace'
import 'brace/mode/scala'

import FlixMode from './FlixMode'
import 'brace/theme/chrome';

class CodeBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.children
        };
    }

    componentDidMount() {
        const customMode = new FlixMode();
        this.refs.aceEditor.editor.getSession().setMode(customMode);
    }

    render() {
        return (
            <div className="editor-frame">
                <div className="editor-code">
                    <AceEditor
                        style={{"width": "48.5em"}}
                        mode='text'
                        theme='chrome'
                        ref="aceEditor"
                        readOnly={true}
                        showGutter={false}
                        showPrintMargin={false}
                        highlightActiveLine={false}
                        value={this.state.text}
                        autoScrollEditorIntoView={true}
                        minLines={1}
                        maxLines={40}
                        editorProps={{$blockScrolling: true}}/>
                </div>
            </div>
        )
    }
}

export default CodeBlock
