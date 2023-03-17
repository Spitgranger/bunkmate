import Navbar from "./Components/Navbar";

export default function Error404() {
    return (
        <>
            <Navbar chooseStyle={'glass'} />
            <img style={{ filter: 'blur(1px)' }} src="https://zeevector.com/wp-content/uploads/Clipart/City-Vector-Line-art.png"></img>
            <h1 style={{ margin: '0px', opacity: '0.9', height: '100vh', position: 'absolute', top: '0px', backgroundColor: 'black', alignItems: 'center', zIndex: '2', color: 'white', width: '100%', justifyContent: 'center', display: 'flex' }}>
                404 the page you were looking for does not exist
            </h1>
        </>
    )

}