import React from 'react';
import styled from 'styled-components';

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
    background: transparent;
`

class LabelComponent extends React.Component {

    render() {
        const { email, password } = this.props;
        return <Container>
            <Row>
                <Label>email:</Label>
                <UnderLine value={email} />
            </Row>
            <Row>
                <Label>password:</Label>
                <UnderLine value={password} type={'password'} />
            </Row>
        </Container>
    }
}

export default LabelComponent