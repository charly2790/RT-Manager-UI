export const Styles = {
    drawer: {        
        flexShrink: 0,
        '& .MuiDrawer-paper': {            
            boxSizing: 'border-box',
            backgroundColor: '#29303A',
            color: 'rgba(255,255,255,0.7)'
        },
        '& .Mui-selected': {
            color: 'red',
        },

    },
    icons: {
        color: 'rgba(255,255,255,0.7)',
        marginLeft:'5%'
    },
    text: {
        '& span': {
            marginLeft: '-10px',            
            fontWeight: '600',
            fontSize: '16px'
        }
    }
}