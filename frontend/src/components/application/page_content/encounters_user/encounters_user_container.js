import { connect } from "react-redux";
import EncountersUser from "./encounters_user";

// COMMENTED OUT LINES ARE LEFT AS FORMATTING EXAMPLES
// import { logout } from "../../actions/session_actions";

const mapStateToProps = state => ({
  // user: state.session.user,
  // loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  // logout: user => dispatch(logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EncountersUser);
