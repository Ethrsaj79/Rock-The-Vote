export const AuthForm = (props) => {
    const {
        btnTxt, 
        handleSubmit, 
        handleChange,
        redirect,
        // errMsg,
        inputs: {
            username, 
            password,
        }
    } = props
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                style={{width: 100, margin: 2}} 
                type="text"
                placeholder={`Username`} 
                value={username}
                name="username" 
                onChange={handleChange}
                />
                <input
                style={{width: 100, margin: 2}} 
                type="text"
                placeholder={`Password`} 
                value={password}
                name="password" 
                onChange={handleChange}
                />
                <br />
                <button onClick={redirect}style={{marginTop: 5}}>{btnTxt}</button>
            </form>
            <div className="error--msg--notification">
                {/* <p>{errMsg}</p> */}
            </div>
        </>
    )
}