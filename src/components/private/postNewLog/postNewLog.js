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
import LinkTool from '@editorjs/link'

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

const addBlock = gql`
mutation($logId:String!,
    $type:String,
    $text:String,
    $imageUrl:String,
    $stretched:Boolean,
    $caption:String,
    $embed:String,
    $height:Int,
    $service:String,
    $source:String,
    $width:Int,
    $level:Int,
    $withBackground:Boolean,
    $withBorder:Boolean,
    $link:String, 
    $title :String,
    $description :String,
    $image :String
    ) {
    addBlock(link:$link, title:$title, description:$description, image:$image,
        logId:$logId,withBackground:$withBackground, withBorder:$withBorder ,type:$type, text:$text, imageUrl:$imageUrl, stretched:$stretched, caption:$caption, embed:$embed, height:$height, service:$service, source:$source, width:$width, level:$level){
      id
      type
      logId
      data {
        text
        file {
          url
        }
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
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: 'http://localhost:4000/api/fetchUrl'
                    }
                },
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
        const { addNewLogMutation, addBlock } = this.props;
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
                editor.save().then(outputData => {
                    const blocks = outputData.blocks;
                    console.log('outputdata:', outputData)

                    blocks.map(async block => {
                        if (block.type === "image") {
                            const { url } = block.data.file;
                            const { caption, stretched, withBackground, withBorder } = block.data;
                            const variables = {
                                logId,
                                type: "image",
                                imageUrl: url,
                                stretched,
                                caption,
                                withBackground,
                                withBorder
                            }
                            await addBlock({
                                variables
                            })
                        } else if (block.type === "paragraph") {
                            const { text } = block.data;
                            const variables = {
                                logId,
                                type: "paragraph",
                                text
                            }
                            await addBlock({
                                variables
                            })
                        } else if (block.type === "header") {
                            const { text, level } = block.data;
                            const variables = {
                                logId,
                                type: "header",
                                text,
                                level
                            }
                            await addBlock({
                                variables
                            })
                        } else if (block.type === "linkTool") {
                            const { link } = block.data;
                            const { description, title } = block.data.meta;
                            const { url } = block.data.meta.image;
                            const variables = {
                                logId,
                                type: "linkTool",
                                link,
                                title,
                                description,
                                image: url
                            }
                            await addBlock({
                                variables
                            })

                        } else if (block.type === 'embed') {
                            const { service, source, embed, caption, height, width } = block.data;
                            const variables = {
                                logId,
                                type: "embed",
                                service,
                                source,
                                embed,
                                caption,
                                height,
                                width
                            }
                            await addBlock({
                                variables
                            })
                        }
                    })
                    // window.location.href = "/"
                })
            })
            .catch(err => console.error(err))


    }
}

export default compose(
    graphql(addNewLogMutation, { name: 'addNewLogMutation' }),
    graphql(addBlock, { name: 'addBlock' })
)(PostNewLog)




