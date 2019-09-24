import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Container = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
const Row = styled.div`
    display:flex;
    width: 60%;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content:space-between;
`

const Label = styled.div``

const UnderLine = styled.input.attrs(props => ({
    disabled: true
}))`
    width: 55%;
    border: 0;
    border-bottom: 1px solid black;
    outline: none;
    text-align: center;
    font-size: 13px;
    padding-bottom: 6px;
`

class LabelComponent extends React.Component {
    render() {
        const {
            name,
            password,
            checkPassword,
            phone,
            email
        } = this.props;
        return <Container>
            <Row>
                <Label>name:</Label>
                <UnderLine value={name} />
            </Row>
            <Row>
                <Label>password:</Label>
                <UnderLine type={'password'} value={password} />
            </Row>
            <Row>
                <Label>check password:</Label>
                <UnderLine type={'password'} value={checkPassword} />
            </Row>
            <Row>
                <Label>phone:</Label>
                <UnderLine value={phone} />
            </Row>
            <Row>
                <Label>email:</Label>
                <UnderLine value={email} />
            </Row>
        </Container>
    }
}

LabelComponent.propTypes = {
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    checkPassword: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
}

export default LabelComponent