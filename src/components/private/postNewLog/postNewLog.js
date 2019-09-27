import React from 'react';
import styled from 'styled-components';
import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import TitleComponent from './title';
import BackButton from './backButton';
import dotenv from 'dotenv';
import { decodeToken } from 'utils/decodeToken'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { compose } from 'redux';

import axios from 'axios'

dotenv.config();



let editor

const addNewLogMutation = gql`
mutation($title:String!, $userId:String!, $image:String, $time:String) {
    addNewLog(title:$title, userId:$userId, image:$image, time:$time){
      id 
      logData {
        id
      }
    }
  }
`


const Container = styled.div`
    width:90%;
`

const Editor = styled.div``

const Button = styled.button``

class PostNewLog extends React.Component {

    state = {
        loading: true,
        title: "",
        imageUrl: "",
        imageFile: '',
        file: null
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
        const { loading, imageFile, title } = this.state;
        const { submitButtonClicked, handleInput, titleImageUploadButtonClicked, titleImageDeleteButtonClicked } = this;
        if (loading) {
            return "loading...."
        } else {
            return <Container>
                <BackButton to={'/'} />
                <TitleComponent titleImageDeleteButtonClicked={titleImageDeleteButtonClicked} titleImageUploadButtonClicked={titleImageUploadButtonClicked} imageFile={imageFile} title={title} handleInput={handleInput} />
                <Editor id={'editorjs'} />
                <Button onClick={submitButtonClicked}>Submit</Button>
            </Container>
        }

    }

    titleImageDeleteButtonClicked = () => {
        this.setState({
            imageFile: '',
            file: null
        })
    }

    titleImageUploadButtonClicked = e => {
        console.log(URL.createObjectURL(e.target.files[0]))
        this.setState({
            imageFile: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitButtonClicked = () => {
        const { title, file } = this.state;
        const time = new Date().getTime().toString();
        const userId = decodeToken();
        const { addNewLogMutation } = this.props;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ndp6lsvf')
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload', false)
        xhr.send(formData);
        const imageResponse = JSON.parse(xhr.responseText);
        const imageUrl = imageResponse.secure_url
        const variables = {
            title,
            userId,
            image: imageUrl,
            time
        }

        addNewLogMutation({
            variables
        })
            .then(res => {
                const logId = res.data.addNewLog.id;

            })
            .catch(err => console.error(err))

        editor.save().then(outputData => console.log(outputData))
    }
}

export default compose(
    graphql(addNewLogMutation, { name: 'addNewLogMutation' })
)(PostNewLog)




