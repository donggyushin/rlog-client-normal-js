import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost'
import { decodeToken } from 'utils/decodeToken';
import { client } from 'App';
import BackButton from '../postNewLog/backButton';
import TitleComponent from '../postNewLog/title';
import EditorJs from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import LinkTool from '@editorjs/link'
import uri from 'uri/uri';

let editor

let uploadedImagesPublicIds = []

const deleteAllLogsFromLog = gql`
mutation($logId:String!, $userId:String!) {
    deleteAllBlocksFromLog(logId:$logId, userId:$userId){
      id
      title
    }
  }
`

const changeLogImage = gql`
mutation($id:String!, $newImage:String, $publicId:String) {
    changeLogImage(id:$id, newImage:$newImage, publicId:$publicId){
      id
      image
    }
  }
`

const changeLogTitle = gql`
mutation($id:String!, $newTitle:String!) {
    changeLogTitle(id:$id, newTitle:$newTitle) {
      id
      title
    }
  }
`

const getLog = gql`
query Log($id:ID!, $userId:String){
    log(id:$id, userId:$userId) {
      id,
      previousLogId
    nextLogId
      title,
      year,
      month,
      day,
      image,
      logData {
        time
        blocks {
          id
          type
          data {
            meta {
                title
                description
                image {
                    url
                }
            }
            link,
            text,
            file {
              url
            },
            stretched,
            caption,
            embed,
            service,
            source,
            height,
            width,
            level,
            withBorder,
            withBackground
          }
        }
      }
    }
  }
`

const Container = styled.div`
    /* display:flex;
    flex-direction:column;
    align-items:center; */
    width:90%;
`

const Editor = styled.div`
    width:100%;
`


const Date = styled.div`
    position:absolute;
    right:6px;
    bottom:0px;
color:${props => props.image ? "white" : "black"};
    font-size: 12px;
    font-weight: 800;
`
const SubmitButton = styled.button`
    position:fixed;
    bottom:20px;
    left:20px;
    z-index: 3;
`


class EditLogPage extends React.Component {

    state = {
        loading: true,
        log: {},
        logData: {},
        privateAsArgs: true,
        imageFile: '',
        file: null,
        title: "",
        titleImageChanged: false,
        uploading: false
    }

    async componentDidMount() {

        const { logId } = this.props.match.params;
        const userId = decodeToken();
        const response = await client.query({
            query: getLog,
            variables: {
                id: logId,
                userId
            }
        })
        console.log('response:', response)
        const log = response.data.log;
        if (log === null) {
            alert(`You don't have authority to access`);
            window.location.href = "/"
        }
        const logData = response.data.log.logData;
        console.log('logdata:', logData)
        editor = new EditorJs({
            holder: 'editorjs',
            tools: {
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: uri + ":4000/api/fetchUrl"
                    }
                },
                header: {
                    class: Header,
                    inlineToolbar: ['link']
                },
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
                                formData.append('file', file)
                                formData.append('upload_preset', 'ndp6lsvf')
                                const xhr = new XMLHttpRequest();
                                xhr.open('POST', 'https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload', false);
                                xhr.send(formData);
                                const imageResponse = JSON.parse(xhr.responseText);
                                console.log('image response: ', imageResponse);
                                uploadedImagesPublicIds.push(imageResponse.public_id)
                                return {
                                    success: 1,
                                    file: {
                                        url: imageResponse.secure_url,
                                        public_id: imageResponse.public_id
                                    }
                                }
                            },
                            uploadByUrl(url) {
                                return fetch(url)
                                    .then(res => res.blob())
                                    .then(blob => {
                                        blob.lastModifiedDate = new Date();
                                        blob.name = "imageFromUrl"
                                        let file = blob
                                        const formData = new FormData();
                                        formData.append('file', file);
                                        formData.append('upload_preset', 'ndp6lsvf')
                                        const xhr = new XMLHttpRequest();
                                        xhr.open('POST', 'https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload', false);
                                        xhr.send(formData);
                                        const imageResponse = JSON.parse(xhr.responseText);
                                        console.log('image response:', imageResponse)
                                        uploadedImagesPublicIds.push(imageResponse.public_id)
                                        return {
                                            success: 1,
                                            file: {
                                                url: imageResponse.secure_url,
                                                publicId: imageResponse.public_id
                                            }
                                        }
                                    })
                            }
                        }
                    }
                },

            },
            data: response.data.log.logData
        })

        this.setState({
            loading: false,
            log,
            logData,
            imageFile: response.data.log.image,
            title: response.data.log.title
        })
    }
    render() {
        const { loading, log, privateAsArgs, imageFile, title } = this.state;
        const { titleImageDeleteButtonClicked, titleImageUploadButtonClicked, handleInput, editButtonClicked } = this;
        if (loading) {
            return <Container>Loading....</Container>
        } else {
            return <Container>
                <BackButton to={'/'} text={'logs'} />
                <TitleComponent
                    titleImageUploadButtonClicked={titleImageUploadButtonClicked}
                    imageFile={imageFile}
                    title={title}
                    handleInput={handleInput}
                    privateAsArgs={privateAsArgs} titleImageDeleteButtonClicked={titleImageDeleteButtonClicked} />

                <Editor id={'editorjs'} />
                <SubmitButton onClick={editButtonClicked}>Edit</SubmitButton>
            </Container>
        }
    }

    editButtonClicked = async () => {
        const { title, titleImageChanged, file } = this.state;
        const { logId } = this.props.match.params;
        const userId = decodeToken();
        const changeLogTitleResponse = await client.mutate({
            mutation: changeLogTitle,
            variables: {
                id: logId,
                newTitle: title
            }
        })

        // If log title changed
        if (titleImageChanged) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ndp6lsvf')
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.cloudinary.com/v1_1/blog-naver-com-donggyu-00/upload', false)
            xhr.send(formData);
            const imageResponse = JSON.parse(xhr.responseText);
            const imageUrl = imageResponse.secure_url;
            const imagePublicId = imageResponse.public_id;
            await client.mutate({
                mutation: changeLogImage,
                variables: {
                    id: logId,
                    newImage: imageUrl,
                    publicId: imagePublicId
                }
            })

        }

        await client.mutate({
            mutation: deleteAllLogsFromLog,
            variables: {
                logId,
                userId
            }
        })

        window.location.href = `/log/${logId}`
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    titleImageUploadButtonClicked = e => {
        console.log(URL.createObjectURL(e.target.files[0]))
        this.setState({
            imageFile: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0],
            titleImageChanged: true
        })


    }

    titleImageDeleteButtonClicked = () => {
        this.setState({
            imageFile: '',
            file: null,
            titleImageChanged: true
        })
    }
}

export default EditLogPage