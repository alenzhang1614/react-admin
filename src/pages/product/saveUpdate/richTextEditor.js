import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (

                <Editor
                    editorState={editorState}
                    editorClassName='editor'
                    wrapperClassName="demo-wrapper"
                    onEditorStateChange={this.onEditorStateChange}
                />

        );
    }
}