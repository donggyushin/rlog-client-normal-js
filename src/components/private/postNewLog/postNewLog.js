import React from 'react';
import styled from 'styled-components';
import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import TitleComponent from './title';
import BackButton from './backButton';
import dotenv from 'dotenv';
import axios from 'axios'

dotenv.config();



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
                                const formData = new FormData();
                                formData.append('file', file);
                                formData.append('upload_preset', 'ndp6lsvf');
                                const xhr = new XMLHttpRequest();
                                xhr.open('POST', 'https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload', false);
                                xhr.send(formData);
                                const imageResponse = JSON.parse(xhr.responseText);

                                return {
                                    success: 1,
                                    file: {
                                        url: imageResponse.secure_url
                                    }
                                }
                            },
                            uploadByUrl(url) {
                                return fetch(url)
                                    .then(res => res.blob())
                                    .then(blob => {
                                        blob.lastModifiedDate = new Date();
                                        blob.name = 'imageFromUrl'
                                        let file = blob
                                        const formData = new FormData();
                                        formData.append('file', file)
                                        formData.append('upload_preset', 'ndp6lsvf')
                                        const xhr = new XMLHttpRequest();
                                        xhr.open('POST', 'https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload', false);
                                        xhr.send(formData);
                                        const imageResponse = JSON.parse(xhr.responseText);
                                        console.log('image response:', imageResponse)
                                        return {
                                            success: 1,
                                            file: {
                                                url: imageResponse.secure_url
                                            }
                                        }
                                    })
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




