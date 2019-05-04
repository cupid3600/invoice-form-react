import red from '@material-ui/core/colors/red';
export const styles = theme => ({
    root: {
        height:"100vh",
        background: '#f0f'
    },
    gridContainer: {
        position: 'relative',
        width: '100vw',
        height: '100vh'
    },
    gridItem: {
        position: 'absolute',
        left: '50%',
        top: '25%',
        transform: 'translateX(-50%)',
        width: '35%',
    },
    cardContainer: {
        minWidth: 275,
        padding: 10
    },
    cardContent: {
        paddingTop: 50
    },
    require_title: {
        fontSize: 12,
        color: 'red',
        paddingBottom: 30
    },
    star_color: {
      color: 'red',
        fontSize: 15
    },
    title: {
        fontSize: 20,
        color: 'black',
        paddingBottom: 5
    },
    option_group: {
        paddingBottom: 20,
    },
    orderFormContainer: {
        margin: theme.spacing.unit,
        minWidth: 150,
    },
    option_div: {
      marginLeft: -14,
        marginRight: 10
    },
    action_foot: {
        marginLeft: 10
    },
    button_next: {
        margin: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    stepperContainer: {
        marginLeft: 20,
        padding: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    stepBar: {
        flex: 1,
        verticalAlign: 'middle',
        marginTop: 5
    },
    stepTxt: {
        marginLeft: 20,
        width: 80
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flex: 1
    },
    otherInputContainer: {
        display: 'flex'
    },
    dateTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    submitDescription: {
        fontSize: 16,
        paddingBottom: 20
    },
    requiredError: {
        color: 'red'
    }
});