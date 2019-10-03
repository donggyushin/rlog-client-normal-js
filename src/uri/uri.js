let uri = "http://localhost"


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
} else {
    // production code
    uri = "https://ec2-15-164-170-141.ap-northeast-2.compute.amazonaws.com"
}

export default uri;