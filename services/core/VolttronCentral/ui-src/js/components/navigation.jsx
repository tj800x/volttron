'use strict';

var React = require('react');
var Router = require('react-router');

var platformManagerActionCreators = require('../action-creators/platform-manager-action-creators');
var authorizationStore = require('../stores/authorization-store');
var platformsPanelActionCreators = require('../action-creators/platforms-panel-action-creators');

var Navigation = React.createClass({
    getInitialState: getStateFromStores,
    componentDidMount: function () {
        authorizationStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        authorizationStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function () {
        if (this.componentDom)
        {
            this.setState(getStateFromStores());
        }
    },
    _onLogOutClick: function () {
        platformManagerActionCreators.clearAuthorization();
    },
    render: function () {
        var navItems;

        if (this.state.loggedIn) {
            navItems = ['Dashboard', 'Platforms', 'Charts', 'Flame', 'GS'].map(function (navItem) {
                var route = navItem.toLowerCase();

                return (
                    <Router.Link
                        key={route}
                        to={route}
                        className="navigation__item"
                        activeClassName="navigation__item--active"
                    >
                        {navItem}
                    </Router.Link>
                );
            });

            navItems.push(
                <a
                    key="logout"
                    className="navigation__item"
                    tabIndex="0"
                    onClick={this._onLogOutClick}
                >
                    Log out
                </a>
            );
        }

        return (

	<div >
            <nav className="navigation"   ref={function(nav) {
                        this.componentDom = nav;
                    }.bind(this)} >
	<span text-align="left">
                <h1 className="logo" text-align="left" >
                    <span className="logo__name">VOLTTRON</span>
                    <span className="logo__tm">&trade;</span>
                    <span className="logo__central">&nbsp;Central</span>
                    <span className="logo__beta">BETA</span>
                    <span className="logo__funding">Funded by DOE EERE BTO</span>
                </h1>
		<span text-align="right">
	 <img src="/img/fraunhofer_square.gif" height="40" align="right" text-align="top" />
                {navItems}
		</span>
	    </span>
            </nav><br/>
	    </div>
        );
    }
});

function getStateFromStores() {
    return {
        loggedIn: !!authorizationStore.getAuthorization(),
    };
}

module.exports = Navigation;
