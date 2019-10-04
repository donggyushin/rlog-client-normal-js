import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.75);
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
        newPhotoFile: null
    }

    render() {
        const { profilePhoto } = this.props;
        return <Container>
            <Card ref={this.setWrapperRef}>
                <FileInput type={'file'} accept="image/*" />
                <Photo src={profilePhoto ? profilePhoto : 'https://images-na.ssl-images-amazon.com/images/I/91M76Va0YSL._SL1500_.jpg'} />
                <OkayButton>Okay</OkayButton>
            </Card>
        </Container>
    }
}

export default ChangeProfilePhoto