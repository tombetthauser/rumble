import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import LeftNavColumn from "./left_nav_column";

const mapStateToProps = state => ({
  user: state.session.user,
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    logout: user => dispatch(logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavColumn);
