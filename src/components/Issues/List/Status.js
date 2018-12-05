/**
 * с - срочно
 * в - важно
 * п - принято исполнителем
 * д - отправлено на доработку
 * х - отменено
 * + - готово
 * √ - принятно инициатором
 *
 * @module Status
 *
 * Created by Evgeniy Malyarov on 05.12.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import cn from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    marginRight: theme.spacing.unit / 2,
  },
  square: {
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
    textAlign: 'center',
    border: '1px lightgrey solid',
    color: theme.palette.text.secondary,
  },
  primary: {
    color: theme.palette.text.primary,
  },
  selected: {
    color: theme.palette.text.primary,
    borderBottom: '2px grey solid',
    fontWeight: 500,
  },
});

function Status({row, classes}) {
  return <div className={classes.root}>
    <div
      className={cn(classes.square, row.mark && classes.primary)}
      title={row.mark ? row.mark : 'Баллы не указаны'}
    >{row.mark || '?'}</div>
    <div
      className={cn(classes.square, row.quickly && classes.selected)}
      title={row.quickly ? 'Срочно' : 'Не срочно'}
    >с</div>
    <div
      className={cn(classes.square, row.important && classes.selected)}
      title={row.important ? 'Важно' : 'Не важно'}
    >в</div>
    {
      row.specify ?
        <div
          className={cn(classes.square, classes.selected)}
          title={'Отправлено на доработку'}
        >д</div>
        :
        <div
          className={cn(classes.square, row.executor_accepted && classes.selected)}
          title={row.executor_accepted ? 'Принято в работу исполнителем' : 'Не принято в работу исполнителем'}
        >{row.executor_accepted ? 'п' : 'н'}</div>
    }
    <div
      className={cn(classes.square, row.completed && classes.selected)}
      title={row.completed ? 'Выполнено' : 'Пока не выполнено'}
    >{row.completed ? '+' : '-'}</div>
    <div
      className={cn(classes.square, row.initiator_accepted && classes.selected)}
      title={row.initiator_accepted ? 'Принято инициатором' : 'Не принято инициатором'}
    >{row.initiator_accepted ? '+' : '-'}</div>
  </div>;
}

export default withStyles(styles)(Status);
