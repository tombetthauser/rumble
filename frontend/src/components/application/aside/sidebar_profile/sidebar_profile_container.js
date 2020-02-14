import { connect } from "react-redux";
import SidebarProfile from "./sidebar_profile";

// COMMENTED OUT LINES ARE LEFT AS FORMATTING EXAMPLES
// import { logout } from "../../actions/session_actions";

const mapStateToProps = state => ({
  // currentUser: state.session.currentUser,
  // loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  // logout: user => dispatch(logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarProfile);
