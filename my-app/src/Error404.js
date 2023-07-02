import Navbar from "./Views/navigation/Navbar";
import {CardMedia} from "@mui/material/CardMedia";

export default function Error404() {
    return (
        <>
            <Navbar chooseStyle={'glass'}/>
            <img style={{height: '99.3%', filter: 'blur(1px)'}}
                 src="https://zeevector.com/wp-content/uploads/Clipart/City-Vector-Line-art.png"></img>
            <h1 style={{
                fontSize: '60px',
                margin: '0px',
                opacity: '0.9',
                height: '100vh',
                position: 'absolute',
                top: '0px',
                backgroundColor: 'black',
                alignItems: 'center',
                zIndex: '2',
                color: 'white',
                width: '100%',
                justifyContent: 'center',
                display: 'flex'
            }}>
                404
            </h1>
            <h2 style={{
                fontWeight: '500',
                margin: '0px',
                zIndex: 2,
                color: '#9A9A9A',
                top: '100px',
                position: 'absolute',
                display: 'flex',
                height: '89vh',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                the page you were looking for does not exist
            </h2>
        </>
    )

}