import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'


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
    z-index: 1;
`


class FormComponent extends React.Component {
    render() {
        const {
            name,
            password,
            checkPassword,
            phone,
            email,
            handleInput,
            submitButtonClicked
        } = this.props;
        return <Container>
            <InputComponent placeholder={'e.g) shin donggyu'} name={'name'} onChange={handleInput} value={name} />
            <InputComponent placeholder={'e.g) ************'} name={'password'} type={'password'} onChange={handleInput} value={password} />
            <InputComponent placeholder={'e.g) ************'} name={'checkPassword'} type={'password'} onChange={handleInput} value={checkPassword} />
            <InputComponent placeholder={'e.g) 01093201234'} name={'phone'} onChange={handleInput} value={phone} />
            <InputComponent placeholder={'nyaconnected@gmail.com'} name={'email'} onChange={handleInput} value={email} />
            <Button onClick={submitButtonClicked}>Submit</Button>
        </Container>
    }

}

FormComponent.propTypes = {
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    checkPassword: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired
}

export default FormComponent