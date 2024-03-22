import { white } from "ansi-colors";
import tc from 'constants/themeConstants'

const styles = theme => ({
    '@keyframes fadein': {
        from: { opacity: 0 },
        to: { opacity: 1 }
    },
    root: {

        display: 'flex',
        height: '100%',
        backgroundColor: tc.darkerThemeColor,
        fontFamily: [tc.iranFont],
        width: "100%",

    },
    '& .drawerPaper': {
        backgroundColor: tc.drawerPaper
    },
    '& .drawerPaperClose': {
        backgroundColor: tc.drawerPaper
    },

    nested: {
        fontFamily: tc.iranFont,


        paddingLeft: theme.spacing.unit * 4,
    },
    heightPage: {
        height: '100%'
    },
    heightMainPage: {
        height: 'calc(100% - 11px)'
    },
    backOfRouterClose: {
        marginLeft: tc.sidebarCloseSize
    },
    noMarginLeft: {
        marginLeft: 0
    },
    wrapper: {
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
        flex: '1 1 auto'
    },
    content: {

        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch'
    },

    navbarButton: {
        '&.right': {
            borderLeft: '1px solid ' + theme.palette.divider
        },
        '&.left': {
            borderRight: '1px solid ' + theme.palette.divider
        }
    },
    navbarFoldedClose: {
        '& $navbarHeader': {
            '& .logo-icon': {
                width: 32,
                height: 32
            },
            '& .logo-text': {
                opacity: 0
            },
            '& .react-badge': {
                opacity: 0
            }
        },
        '& .list-item-text, & .arrow-icon': {
            opacity: 0
        },
        '& .list-subheader .list-subheader-text': {
            opacity: 0
        },
        '& .list-subheader:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            minWidth: 16,
            borderTop: '2px solid',
            opacity: .2
        },
        '& .collapse-children': {
            display: 'none'
        },
        '& .user': {
            '& .username, & .email': {
                opacity: 0
            },
            '& .avatar': {
                width: 40,
                height: 40,
                top: 32,
                padding: 0
            }
        },
        '& .list-item.active': {
            marginLeft: 12,
            width: 40,
            padding: 12,
            borderRadius: 20,
            '&.square': {
                borderRadius: 0,
                marginLeft: 0,
                paddingLeft: 24,
                width: '100%'
            }
        }
    },
    bgThemeDarker: {
        backgroundColor: tc.darkestThemeColor
    },
    lighcolor: {
        color: tc.lightestColor
    },
    whitecolor: {
        color: "white"
    },
    sidebarHeader: {
        '& span': {
            fontFamily: tc.iranFont,
            fontSize: tc.sidebarHeaderFontSize,
            fontWeight: 'bold',
        }
    },

    navbarHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
        flex: '0 1 auto',
        flexDirection: 'row',
        height: tc.navbarHeaderWrapperHeight,
        minHeight: tc.navbarHeaderWrapperHeight
    },
    navbarHeader: {
        display: 'flex',
        flex: '1 0 auto',
        padding: tc.navbarHeaderPadding
    },
    navbarContent: {
        overflowX: 'hidden',
        overflowY: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        background: tc.navbarContentBackground,
        backgroundRepeat: 'no-repeat',
        backgroundSize: tc.navbarContentBackgroundSize,
        backgroundAttachment: 'local, scroll'
    },
    toolbar: {
        paddingRight: tc.toolbarPaddingRight,
        fontFamily: tc.iranFont,
        backgroundColor: tc.toolbarColor,
        boxShadow: tc.toolbarShadow,
        textAlign: "left",
        height: 48,
        maxHeight: 48,
        minHeight: 48
    },
    Typography: {
        fontFamily: tc.iranFont
    },
    toolbarIcon: {
        fontFamily: tc.iranFont,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: tc.toolbarIconPadding,
        ...theme.mixins.toolbar,
        fontFamily: tc.iranFont,
        backgroundColor: tc.lighterThemeColor,
        '& button': {
            color: "white"
        }
    },
    mainModule:
    {
        animationName: 'fadeIn',
        animationDuration: "3s"


        // transition: theme.transitions.create(['opacity'], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),

    },
    appBar: {
        fontFamily: tc.iranFont,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {

        '@media (max-width: 800px)': {
            marginLeft: 0,
            width: `100%`,

        },
        '@media (max-width: 1400px)': {
            marginLeft: "220px !important",
            width: `1200px`,

        },
        marginLeft: tc.drawerWidth,
        width: `calc(100% - ${tc.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        fontFamily: tc.iranFont,

        marginLeft: tc.menueButtonMarginLeft,
        marginRight: tc.menueButtonMarginRight,
    },
    menuButtonHidden: {
        display: 'none',
        fontFamily: tc.iranFont
    },
    title: {
        flexGrow: 1,
        fontFamily: tc.iranFont,
        fontSize: tc.sideBarTitleFontSize,
        color: tc.sidebarTitleColor
    },
    typographyPanel: {
        color: "white",
        fontFamily: tc.iranFont,
        float: "left",
        left: 0
    },
    drawerPaper: {
        '@media (max-width: 1400px)': {

            boxShadow: tc.drawerShadow,
            backgroundColor: tc.darkestThemeColor,
            fontFamily: tc.iranFont,
            zIndex: tc.drawerPaperZIndex,
            position: 'relative',
            whiteSpace: 'nowrap',
            width: 220,
            // position: 'fixed',

            maxHeight: "100%",
            // height:"90%",
            minHeight: "90.9%",
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),

            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            overflowScrolling: "touch",
            backgroundRepeat: "no-repeat",
            backgroundSize: tc.drawerPaperBackgroundSize,
            backgroundAttachment: " local, scroll",


        },
        '@media (max-width: 800px)': {
            display: "none"
        },
        boxShadow: tc.drawerShadow,
        backgroundColor: tc.darkestThemeColor,
        fontFamily: tc.iranFont,
        zIndex: tc.drawerPaperZIndex,
        position: 'relative',
        whiteSpace: 'nowrap',
        width: tc.drawerWidth,
        // position: 'fixed',

        maxHeight: "100%",
        // height:"90%",
        minHeight: "90.9%",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        overflowScrolling: "touch",
        backgroundRepeat: "no-repeat",
        backgroundSize: tc.drawerPaperBackgroundSize,
        backgroundAttachment: " local, scroll",
    },
    drawerPaperClose: {
        zIndex: tc.drawerPaperZIndex,
        position: 'fixed',
    
        right: tc.drawepaperCloseRight,
        '& .level3Link': {
            display: "none",

        },
        '& .sidebarMenueItem .searchPaper': {
            display: "none",

        },
        '& .sidebarMenueItem .sidebarHeader': {
            display: "none",

        },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,

        }),




        '& .avatarSidebar': {
            width: tc.avatoarSideBarSmall,
            height: tc.avatoarSideBarSmall,
            border: tc.avatoarSideBarBorder,
            top: tc.avatoarSideBarBigTop
        },
        '& .sidebarListItemText': {
            display: "none"
        },
        '& .user': {
            '& .username, & .email': {

                display: "none"
            },
        },
        '& .toolbarIcon': {

            '& .iconSlide': {
                display: "none"
            }
        },
        '&:hover': {
            '@media (max-width: 1400px)': {
                width: 220,
    
    
            },
            '@media (max-width: 800px)': {
                width: 220,
    
    
            },
            position: 'relative',
            whiteSpace: 'nowrap',
            width: tc.drawerWidth,
            position: 'fixed',
            right: 0,
            '& .level3Link': {
                display: "flex",

            },
            '& .sidebarMenueItem .searchPaper': {
                display: "flex",

            },
            '& .avatarSidebar': {
                width: tc.avatoarSideBarBig,
                height: tc.avatoarSideBarBig,
                border: tc.avatoarSideBarBigBorder,
                top: tc.avatoarSideBarBigTop
            },
            '& .sidebarMenueItem .sidebarHeader': {
                display: "flex",

            },
            '& .toolbarIcon': {
                display: 'flex'
            },
            '& .user': {
                '& .username, & .email': {

                    display: "flex"
                },
            },
        },
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: {
        '@media (min-height: 600px)': {
            minHeight: 40
        },
    },
    content: {
        fontFamily: tc.iranFont,


        flexGrow: tc.contentFlexGrow,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'hidden',

    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        fontFamily: tc.iranFont,

        marginBottom: theme.spacing.unit * 2,
    },
    ListItemText: {
        fontFamily: tc.iranFont,
    },
    ListItem: {
        fontFamily: tc.iranFont
    },
    MuiTypography: {
        fontFamily: tc.iranFont

    },
    listItemText: {
        span: { fontFamily: tc.iranFont, fontWeight: 'bold' },
        fontFamily: tc.iranFont,
    },

    rtl: {
        fontFamily: tc.iranFont,
        '&span': {
            fontFamily: tc.iranFont
        }
    },
    avatarSidebar: {
        width: tc.avatoarSideBarBig,
        height: tc.avatoarSideBarBig,
        position: 'absolute',
        top: tc.avatoarSideBarBigTop,
        padding: 8,
        borderRadius: tc.avatarSidebarborderRadius,
        border: tc.avatoarSideBarBigBorder,
        background: theme.palette.background.default,
        boxSizing: 'content-box',
        left: tc.avatarsidebarLeft,
        transform: tc.avatarSideBarTansform,
        display: 'flex',
        '& > img': {
            transform: tc.avatarSideBarTansformImg,
        },
    },
    iconSlide: {
        color: "white",
        position: "absolute",
        left: 246,
        '@media (max-width: 1400px)': {
            left: 189,


        },
        '&:hover': {
            backgroundColor: tc.iconSlideHover,
            transition: theme.transitions.create(['background'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            })
        }
    },
    logo: {
        position: 'absolute',
        left: 15,
        top: 15
    },
    sidebarHeaderText: {
        '@media (max-width: 1400px)': {
            fontSize: 12
        },
        position: 'absolute',
        left: 72,
        top: 25,
        color: "white",

    },

    navbarIcon: {
        textAlign: "right !important",
        float: "right !important",
        right: "0 !important",
        position: "absolute",
        '& span': {
            textAlign: "left !important",
            float: "left !important",
            left: "0 !important",
        }
    },
    menuNavbar: {
        fontFamily: tc.iranFont,
        color: "#0000007d"
    },
    sidebarMenueItem: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'calc(100% - 64px)'

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: "8px .15rem",

        fontFamily: tc.iranFont,

    },
    formControlAutoComplete: {
        margin: "0 .15rem",

        fontFamily: tc.iranFont,
    },
    formControlError: {
        margin: theme.spacing.unit,
        fontFamily: tc.iranFont,


    },
    inputLabelOutLine: {
        padding: "0 2px",
        textAlign: "right",
        float: "right",
        fontFamily: tc.iranFont,
        backgroundColor: "white",
        transform: "translate(2px, 10px) scale(1)",
        '@media (max-width: 1711px)': {
            fontSize: "85%"
        },
        '@media (max-width: 1577px)': {
            fontSize: "72% !important"
        }
    },
    inputLabelOutLineFoccused: {
        padding: "0 2px",
        textAlign: "right",
        float: "right",
        fontFamily: tc.iranFont,
        backgroundColor: "white",
        transform: "translate(10px, 6px) scale(0.75)",
        '@media (max-width: 1711px)': {
            fontSize: "85%"
        },
        '@media (max-width: 1577px)': {
            fontSize: "72% !important"
        }
    },
    inputLabelOutLineError: {
        padding: "0 2px",
        textAlign: "right",
        float: "right",
        fontFamily: tc.iranFont,
        backgroundColor: "white",
        transform: "translate(2px, 10px) scale(1)",
        '& fieldset': {
            borderColor: "red"
        }
    },
    inputLabelOutLineErrorFoccused: {
        padding: "0 2px",
        textAlign: "right",
        float: "right",
        fontFamily: tc.iranFont,
        backgroundColor: "white",
        transform: "translate(10px, 6px) scale(0.75) !important",
        '& fieldset': {
            borderColor: "red"
        }
    },
    OutlineInput: {
        fontFamily: tc.iranFont,
        boxShadow: "0 0 0 30px white inset !important",
        '& fieldset': {
            '& input': { padding: '8.5px 14 px' }

        }

    },
    form: {
        height: '100%',
        width: '100%', // Fix IE 11 issue.
        marginTop: 2 * theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        paddingTop: 1.5 * theme.spacing.unit,
        paddingBottom: 2 * theme.spacing.unit
    },

    margin: {
        margin: theme.spacing.unit,
    },
    btnEdit: {
        margin: 0,

        minWidth: '12px !important',
        minHeight: '18px !important',
        borderRadius: "50%"
    },

    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsBlue: {
        borderBottom: '1px solid #e8e8e8',
        backgroundColor: "#2196f3",
        color: 'white'
    },
    tabsRed: {
        borderBottom: '1px solid #e8e8e8',
        backgroundColor: "#f32121",
        color: 'white'


    },
    tabsOrderIndicator: {

    },


    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabsIndicatorCustom: {
        backgroundColor: 'white',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        backgroundColor: "transpartent",
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: 'isw',

        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },

    submit: {
        margin: '.3em .5em'
    }
});
export default styles;