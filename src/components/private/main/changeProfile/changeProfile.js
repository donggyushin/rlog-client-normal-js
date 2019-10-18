import React from 'react';
import styled from 'styled-components';
import uri from 'uri/uri';
import gql from 'graphql-tag';
import { client } from 'App';
import { decodeToken } from 'utils/decodeToken';
import { getUserInfo } from '../Main';
import LoadingComponent from 'components/global/loadingComponent';

const updateUserImageProfileMutation = gql`
mutation($id:ID!, $profileImage:String, $profileImagePublicId:String) {
    updateUserProfileImage(id:$id, profileImage:$profileImage, profileImagePublicId:$profileImagePublicId) {
      id
      profilePhoto
      profilePhotoPublicId
    }
  }
`

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.75);
    z-index:3;
    color:white;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`

const Card = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position: relative;
`

const FileInput = styled.input`
    position: absolute;
    height: 250px;
    opacity: 0;
    cursor: pointer;
    z-index: 4;

`

const Photo = styled.img`
    width:250px;
    height:250px;
    border-radius:50%;
    background:transparent;
    object-fit:cover;
    z-index:3;
`

const OkayButton = styled.button`
    background: white;
    border: 0;
    font-size: 20px;
    cursor: pointer;
    outline: none;
    margin-top: 22px;
`

class ChangeProfilePhoto extends React.Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            const { turnOffChangeProfileView } = this.props;
            console.log('you clicked outside of card!')
            turnOffChangeProfileView()
        }
    }

    state = {
        photoChanged: false,
        changePhotoImage: "",
        newPhotoFile: null,
        loading: false
    }

    render() {
        const { profilePhoto } = this.props;
        const { inputChange, okayButtonClicked } = this;
        const { photoChanged, changePhotoImage, loading } = this.state;
        return <Container>
            <Card ref={this.setWrapperRef}>
                <FileInput onChange={inputChange} type={'file'} accept="image/*" />
                {photoChanged ? <Photo src={changePhotoImage} /> : <Photo src={profilePhoto ? profilePhoto : 'https://images-na.ssl-images-amazon.com/images/I/91M76Va0YSL._SL1500_.jpg'} />}
                {/* <Photo src={profilePhoto ? profilePhoto : 'https://images-na.ssl-images-amazon.com/images/I/91M76Va0YSL._SL1500_.jpg'} /> */}
                <OkayButton disabled={!photoChanged} onClick={okayButtonClicked}>Okay</OkayButton>
            </Card>
            {loading && <LoadingComponent />}
        </Container>
    }

    okayButtonClicked = () => {
        this.setState({
            loading: true
        })
        const { newPhotoFile, photoChanged } = this.state;
        const { turnOffChangeProfileView, changeProfileImage } = this.props;
        if (photoChanged === false) {
            alert('You need to choose a new picture')
            return;
        }
        const formData = new FormData();
        formData.append('file', newPhotoFile);
        console.log('new photo file: ', newPhotoFile);
        fetch(uri + ":4000/api/image-to-cloudinary", {
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(body => {
                const profileImage = body.imageUrl;
                const profileImagePublicId = body.publicId;
                const id = decodeToken();

                const variables = {
                    id,
                    profileImage,
                    profileImagePublicId
                }
                client.mutate({
                    mutation: updateUserImageProfileMutation,
                    variables
                    // refetchQueries: [{
                    //     query: getUserInfo,
                    //     variables: {
                    //         id
                    //     }
                    // }]
                }).then(result => {

                    console.log("update user profile image result: ", result)
                    const { data: { updateUserProfileImage: { profilePhoto, profilePhotoPublicId } } } = result;
                    console.log('profilePhoto:', profilePhoto);
                    console.log('profilePhotoPublicId:', profilePhotoPublicId);
                    changeProfileImage(profilePhoto)
                    turnOffChangeProfileView()
                })
            })
        })
    }

    inputChange = e => {
        this.setState({
            photoChanged: true,
            changePhotoImage: URL.createObjectURL(e.target.files[0]),
            newPhotoFile: e.target.files[0]
        })
    }
}

export default ChangeProfilePhoto