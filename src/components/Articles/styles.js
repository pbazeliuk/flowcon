import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  top: {
    marginTop: theme.spacing.unit * 2,
  },
  bottom: {
    width: '100%',
  },
  subrow: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit / 2,
    fontWeight: 400,
  },
  link: {
    display: 'list-item',
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit / 2,
  },
  details: {
    flexDirection: 'column',
  }
});

export default withStyles(styles);
