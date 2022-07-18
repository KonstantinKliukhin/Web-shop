const currenciesStyles = {
    wrapper: {
        width: '28px',
        height: '100%'
    },
    header: {
        width: 'inherit',
        height: 'inherit',
        fontSize: '1.8rem',
        fontWeight: '500'
    },
    list: {
        width: '114px',
        top: '77%',
        left: '-50%',
        boxShadow: '0px 4px 35px rgba(168, 172, 176, 0.19)',
    },
    listItem: {
        height: '45px',
        width: '100%',
        padding: '20px',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: '1.8rem',
        lineHeight: '50%',
    },
    arrow: {
        width: '6px',
        height: '3px',
    },
    overlayStyle: {
        top: '100%',
        background: '#000',
    }
}

const miniCartStyles = {
    menu: {
        height: '100%',
    },
    header: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        width: '20px',
        height: '18px',
    },
    list: {
        top: '100%',
        background: '#fff',
    },
    overlayStyles: {
        top: '80px',
    }
}

export {currenciesStyles, miniCartStyles};