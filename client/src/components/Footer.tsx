import wsj from '../assets/WSJ.png';
import coindesk from '../assets/coindesk.png';

const styles = {
    footer: {
        backgroundColor: '#6D8EA0',
        position: 'static' as React.CSSProperties['position'],
        bottom: 0,
        left: 0,
        width: '100%',
        height: '6.5vw',
        padding: '0.5vw',
        marginTop: '1vw',        
        textAlign: 'center' as React.CSSProperties['textAlign']
    },
    logo1: {
        height: '3vw',
        margin: '1vw'
    },
    logo2: {
        height: '4vw',
        margin: '1vw',
        borderRadius: '8%'
    }
}

function Footer () {
    return (
        <footer style={styles.footer}>
            <a  href='https://www.wsj.com/' target='_blank' rel='noopener noreferrer'>
                    <img style={styles.logo1} src={wsj} alt='Wallstreeet Journal Logo'></img>
            </a>
            <a href='https://www.coindesk.com/' target='_blank' rel='noopener noreferrer'>
                    <img style={styles.logo2} src={coindesk} alt='GitHub Logo'></img>
            </a>
        </footer>
    )
}

export default Footer;