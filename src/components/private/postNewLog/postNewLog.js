import React from 'react';
import styled from 'styled-components';
import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import TitleComponent from './title';
import BackButton from './backButton';

let editor


const Container = styled.div`
    width:90%;
`

const Editor = styled.div``

const Button = styled.button``

class PostNewLog extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {
        editor = new EditorJs({
            holderId: 'editorjs',
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link']
                },
                // list: {
                //   class: List,
                //   inlineToolbar: [
                //     'link',
                //     'bold',
                //   ]
                // },
                embed: {
                    class: Embed,
                    inlineToolbar: false,
                    config: {
                        services: {
                            youtube: true
                        }
                    }
                },
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            uploadByFile(file) {
                                console.log(file)
                            },
                            uploadByUrl(url) {
                                console.log(url)
                            }
                        }
                    }
                }
            }
        })
        this.setState({
            loading: false
        })
    }

    render() {
        const { loading } = this.state;
        const { submitButtonClicked } = this;
        if (loading) {
            return "loading...."
        } else {
            return <Container>
                <BackButton to={'/'} />
                <TitleComponent />
                <Editor id={'editorjs'} />
                <Button onClick={submitButtonClicked}>Submit</Button>
            </Container>
        }

    }

    submitButtonClicked = () => {
        editor.save().then(outputData => console.log(outputData))
    }
}

export default PostNewLog




