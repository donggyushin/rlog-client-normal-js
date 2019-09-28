import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
`

const YoutubeVideoContainer = styled.div`
    background:black;
`

const YoutubeVideo = styled.iframe`
    width:100%;
    height:100%;
`

const Caption = styled.div`
border:1px solid gainsboro;
border-radius:4px;
margin-bottom:20px;
`

const CaptionText = styled.div`
    margin-left:20px;
    margin-right:20px;
    font-size:14px;
`

const NormalText = styled.div`
    font-size:15px;
    margin-bottom:20px;
`

const ImageContainer = styled.div`
    max-width:80%;
`

const Image = styled.img`
    max-width:100%;
`

const HeaderContainer = styled.div`
    margin-bottom:20px;
`

class Block extends React.Component {

    render() {
        const { block } = this.props;
        return <Container>
            {block.type === 'embed' && <>

                <YoutubeVideo style={{
                    width: block.data.width,
                    height: block.data.height
                }} src={block.data.embed} />
                <Caption style={{
                    width: block.data.width,
                    paddingTop: 10,
                    paddingBottom: 10,
                }}>
                    <CaptionText>
                        {block.data.caption}
                    </CaptionText>
                </Caption>

            </>}
            {block.type === 'paragraph' && <>
                <NormalText>
                    {block.data.text}
                </NormalText>
            </>}
            {block.type === 'image' && <>
                <ImageContainer>
                    <Image src={block.data.file.url} />
                    <Caption style={{
                        width: block.data.width,
                        paddingTop: 10,
                        paddingBottom: 10,
                    }}>
                        <CaptionText>
                            {block.data.caption}
                        </CaptionText>
                    </Caption>
                </ImageContainer>
            </>}
            {block.type === 'header' && <>
                <HeaderContainer>
                    {block.data.level === 1 && <h1>{block.data.text}</h1>}
                    {block.data.level === 2 && <h2>{block.data.text}</h2>}
                    {block.data.level === 3 && <h3>{block.data.text}</h3>}
                    {block.data.level === 4 && <h4>{block.data.text}</h4>}
                    {block.data.level === 5 && <h5>{block.data.text}</h5>}
                    {block.data.level === 6 && <h6>{block.data.text}</h6>}
                </HeaderContainer>
            </>}
        </Container>
    }
}

export default Block