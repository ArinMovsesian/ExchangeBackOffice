import tc from 'constants/themeConstants'
const styles = theme => ({
    
    main: {
      width: '100%',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: "95%",
        marginLeft: 'auto',
        marginRight: 'auto',
        direction:'rtl',
        fontFamily:'isw',
        
        
      },
    },

    rtl:{
        fontFamily:tc.iranFont,
        direction:"rtl"
    },
    inputLabel:{
        right:0,
        float:"right",
        direction:"rtl"
    },
   
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
      fontFamily:'isw',
      backgroundColor:tc.buttonPrimaryColor,
      '&:hover':{
        backgroundColor:tc.buttonPrimaryColorHover
      }    
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
    },
    inputLabelOutLine:{
      padding:"0 2px",
      textAlign:"right",
      float:"right",
      fontFamily:tc.iranFont,
      backgroundColor:"white",
      
    },
    OutlineInput:{
    
     
        boxShadow: "0 0 0 30px white inset !important"
     
    }
    
    
    
  });
  export default styles;