/**
 * ### Комплект диаграмм
 * Получает настройки из профиля пользователя и выводит пачку
 *
 * @module Diagrams
 *
 * Created by Evgeniy Malyarov on 16.08.2018.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import AppContent from 'metadata-react/App/AppContent';
import Snack from 'metadata-react/App/Snack';
import DiagramsArray from './DiagramsArray';
import Settings from './Settings';
import connect from './connect';


const ltitle = 'Диаграммы';


class Diagrams extends React.Component {

  state = {
    diagrams: [],
    grid: "1",
    snack: '',
    reseted: false,
  };

  componentDidMount() {
    this.shouldComponentUpdate(this.props);
    setTimeout(() => this.setDiagrams(), 400);
  }

  setDiagrams(force) {
    const {props} = this;
    if(!force && this.logged_in === props.user.logged_in) {
      return;
    }
    this.logged_in = props.user.logged_in;
    props.diagrams()
      .then(({diagrams, grid}) => {
        this.setState({diagrams, grid});
        props.subscribe(this.setDiagrams.bind(this, true));

        if(force) {
          this.setState({snack: 'Данные обновлены'});
          setTimeout(() => this.setState({snack: ''}), 1500);
        }
      });
  }

  shouldComponentUpdate({handleIfaceState, title, user}) {

    if(title != ltitle) {
      handleIfaceState({
        component: '',
        name: 'title',
        value: ltitle,
      });
      handleIfaceState({
        component: '',
        name: 'CustomBtn',
        value: Settings,
      });
      return false;
    }

    if(user.logged_in) {
      if(this.state.snack) {
        this.setState({snack: ''});
        this.setDiagrams();
      }
    }
    else if(!this.state.reseted && !this.state.snack) {
      this.setState({snack: 'Пользователь не авторизован - демо режим'});
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.props.unsubscribe();
    this.props.handleIfaceState({
      component: '',
      name: 'CustomBtn',
      value: null,
    });
  }

  render() {
    const {props: {classes, queryGrid}, state: {diagrams, snack, grid}}  = this;
    return <AppContent fullWidth>
      <Helmet title={ltitle}>
        <meta name="description" content="Комплект диаграмм" />
      </Helmet>
      {
        snack && <Snack
          snack={{open: true, message: snack, button: 'Закрыть'}}
          handleClose={() => this.setState({snack: false, reseted: true})}
        />
      }
      <AutoSizer disableHeight style={{overflow: 'hidden', width: '100%', paddingBottom: 48}}>
        {({width}) => <DiagramsArray
          width={width}
          classes={classes}
          diagrams={diagrams}
          grid={queryGrid() || grid}
        />}
      </AutoSizer>
    </AppContent>;
  }
}



Diagrams.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleIfaceState: PropTypes.func.isRequired,
  diagrams: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  queryGrid: PropTypes.func.isRequired,
  snack: PropTypes.object,
  user: PropTypes.object,
};

export default connect(Diagrams);