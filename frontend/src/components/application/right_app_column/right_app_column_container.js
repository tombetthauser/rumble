import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import RightAppColumn from "./right_app_column";

const mapStateToProps = state => ({
  user: state.session.user,
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    logout: user => dispatch(logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(RightAppColumn);
