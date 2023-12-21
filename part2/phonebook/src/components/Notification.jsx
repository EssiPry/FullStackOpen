const Notification = ({message}) => {
    console.log(message)
    //console.log(type)
    if (message.text === '') {
        return null
    }

    if (message.type === 'success') {
        return (
            <div className="success">
                {message.text}
            </div>
    )} else {
        return (
            <div className="error">
                {message.text}
            </div>

    )}

}

export default Notification