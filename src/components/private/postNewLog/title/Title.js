import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:100vw;
    display:flex;
    justify-content:center;
    align-items:center;
`

const TitleImageContainer = styled.div`
    width:50%;
    position: relative;
    height:200px;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:10px;
`

const TitleImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 3px;
`

const Title = styled.input`
    color:${props => props.file ? 'white' : 'black'};
    position: absolute;
    border: 0;
    font-size: 20px;
    text-align: center;
    border-bottom: ${props => props.file ? '0px' : '1px solid black'};
    width: 48%;
    padding-bottom: 10px;
    outline:none;
    background: transparent;

`

const ImageUploadButton = styled.input`
    position: absolute;
    top: 12px;
    left: 19px;
    width: 20px;
    height: 20px;
    opacity: 0;
    z-index:2;
    cursor: pointer;
`

const ImageUploadIcon = styled.i`
    color: ${props => props.file ? 'white' : 'black'};
    font-size: 20px;
    position: absolute;
    top: 12px;
    left: 20px;
    cursor: pointer;
`

const ImageDeleteIcon = styled.i`
    color: white;
    font-size: 15px;
    position: absolute;
    top: 41px;
    left: 22px;
    -webkit-transform: skew(45deg,-45deg);
    -ms-transform: skew(45deg,-45deg);
    transform: skew(45deg,-45deg);
    cursor: pointer;
`

class TitleComponent extends React.Component {
    state = {
        title: "",
        titleImage: null,
        file: null
    }
    render() {
        const { title, titleImage, file } = this.state;
        const { handleInput, TitleImageUploadButtonClicked, TitleImageDeleteButtonClicked } = this;
        return <Container>
            <TitleImageContainer>
                {file && <TitleImage src={file} />}
                <Title file={file} onChange={handleInput} name={'title'} value={title} />
                <ImageUploadButton onChange={TitleImageUploadButtonClicked} accept="image/*" type={'file'} />
                <ImageUploadIcon file={file} className={'fas fa-plus'} />
                {file && <ImageDeleteIcon onClick={TitleImageDeleteButtonClicked} className={'fas fa-plus'} />}
            </TitleImageContainer>
        </Container>
    }

    TitleImageDeleteButtonClicked = () => {
        this.setState({
            file: null
        })
    }

    TitleImageUploadButtonClicked = e => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default TitleComponent;