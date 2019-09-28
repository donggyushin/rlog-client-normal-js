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

const EmbedLinkContainer = styled.a`
    width:650px;
    padding-left:20px;
    padding-right:20px;
    padding-top:30px;
    padding-bottom:20px;
    background:#fff;
    border: 1px solid rgba(201, 201, 204, 0.48);
    box-shadow: 0 1px 3px rgba(0,0,0, .1);
    border-radius: 6px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    position: relative;
    text-decoration:none;
    color:black;
    margin-bottom:30px;
`

const LinkTitle = styled.div`
    font-size: 17px;
    font-weight: 600;
    line-height: 1.5em;
    margin: 0 0 10px 0;
`

const LinkDesc = styled.div`
    margin: 0 0 20px 0;
    font-size: 15px;
    line-height: 1.55em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width:82%;
    max-height:80px;
`

const LinkImage = styled.img`
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 0 0 30px;
    width: 65px;
    height: 65px;
    border-radius: 3px;
    position:absolute;
    top:30px;
    right:30px;
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
            {(block.type === 'linkTool') && <>
                <EmbedLinkContainer target={'_blank'} href={block.data.link}>
                    <LinkTitle>
                        {block.data.meta.title}
                    </LinkTitle>
                    <LinkDesc>
                        {block.data.meta.description}
                    </LinkDesc>
                    {block.data.meta.image.url && <LinkImage src={block.data.meta.image.url} />}
                </EmbedLinkContainer>
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