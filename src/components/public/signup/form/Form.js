import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position: relative;
`

const InputComponent = styled.input`
    width: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid gainsboro;
    outline: none;
    padding-left:10px;
`

const Button = styled.button`
    position: absolute;
    top: 79%;
    border: 0;
    color: white;
    background: black;
    border-radius: 3px;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 14px;
    cursor: pointer;
    z-index:1;
`

class FormComponent extends React.Component {
    render() {
        const {
            handleInput,
            email,
            password,
            submitButtonClicked
        } = this.props;
        return <Container>
            <InputComponent onChange={handleInput} value={email} placeholder={'e.g) nyaconnected@gmail.com'} name={'email'} />
            <InputComponent onChange={handleInput} type={'password'} value={password} placeholder={'e.g) ************'} name={'password'} />
            <Button onClick={submitButtonClicked}>Submit</Button>
        </Container>
    }
}

export default FormComponent