import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <script src="https://kit.fontawesome.com/73c21df2c0.js" crossOrigin="anonymous"></script>
                    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
                </Head>
                <Main />
                <NextScript/>
            </Html>
        )
    }
}

export default MyDocument