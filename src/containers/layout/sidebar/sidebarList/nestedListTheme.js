import tc from 'constants/themeConstants';
const styles = theme => ({
  root: {
    width: '100%',
    fontFamily: tc.fontFamily,
    maxWidth: 360,

    '& span': {
      fontFamily: tc.fontFamily,
      // fontWeight:'bold',
      backgroundColor: "transparent"
    },
    '& h1,& h2,& h3,& h4,& h5,& h6,& p': {
      color: 'white'

    },
    '& button': {
      color: 'white'
    },
    '& hr': {
      backgroundColor: 'white'
    },
     


  },
  nested: {
    fontFamily: tc.fontFamily,
    paddingLeft: theme.spacing.unit * 4,
  },
  ListItem: {
    fontFamily: tc.fontFamily,
  },
  sidebarListItem: {
    fontFamily: tc.fontFamily,
    // fontWeight:'bold',
    '& span': { fontFamily: tc.fontFamily, color: 'white' },
    '& div': { color: 'white' },
    color: 'white !important',
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingLeft: 24,
    paddingRight: 12,
    '&:hover': {
      backgroundColor: "rgba(156, 150, 150, 0.08)",

      // transition: theme.transitions.create(['background-color'], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.shorter
      // }),
    },
    '&.active': {
      backgroundColor: '#039be5',
      color: '#fff!important',
      pointerEvents: 'none',
    }

  },
  sidebarListItemText: {
        
    '@media (max-width: 1400px)':{
      fontFamily: tc.fontFamily,
      position: 'absolute',
      left: 28,
      fontSize:10,
      '& span': {
        fontFamily: 'isw',
        // fontWeight:'bold',
        direction: 'rtl',
      fontSize:10,

    },
  },
    fontFamily: tc.fontFamily,
    position: 'absolute',
    whiteSpace : 'normal',
    left: 58,
    '@media (max-width: 800px)': {
      left: 58,
  },
    '& span': {
      fontFamily: 'isw',
      // fontWeight:'bold',
      direction: 'rtl',

    }
  },

  expand: {
    position: 'absolute',
    left: 255,
    '@media (max-width: 1400px)': {
      position: 'absolute',
    left: 180,

  }
  },
  header: {
    paddingLeft: 20,
    paddingBottom:7,
    paddingTop:6,
    fontWeight: 'bold',
    color: "#ffffff75",


  },
  divider: {
    backgroundColor: '#ffffff14',
    margin: 20,
    marginTop: 2,
    marginBottom: 0
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,

    },
  },
  searchForm: {
    position: "absolute",
    left: 60
  },
  bootstrapInput: {


    backgroundColor: theme.palette.common.white,

    fontFamily: 'isw',


  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  textField: {
    flexBasis: 200,
  },
 
  input: {
    marginLeft: 8,
    flex: 1,
    fontFamily: tc.iranFont
  },
  iconButton: {
    padding: 10,
  },

  searchPaper: {
    
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    width: 276,
    // position:"absolute",
    height:41,
    marginLeft:10
  },
  searchIcon: {
    color: "black"
  },
  activeLinkOfSidebar: {

    width: "97%",
    color: "#fff!important",
    transition: "border-radius .15s cubic-bezier(0.4, 0, 0.2, 1)",
    pointerEvents: "none",
    backgroundColor: "#039be5",
    borderRadius: "20px 0 0 20px"
  },
});
export default styles;