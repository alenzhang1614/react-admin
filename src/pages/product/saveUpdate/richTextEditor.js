import React, { Component } from 'react';
import { EditorState,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types'

import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



export default class RichTextEditor extends Component {
    static propTypes= {
        detail:PropTypes.string.isRequired
    }
    constructor(props){
        super(props)
        const blocksFromHtml = htmlToDraft(this.props.detail);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState );
        this.state = {
            editorState
        }
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