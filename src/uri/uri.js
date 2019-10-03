let uri = "http://localhost"


if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
} else {
    // production code
    uri = "https://www.rlog.link"
}

export default uri;