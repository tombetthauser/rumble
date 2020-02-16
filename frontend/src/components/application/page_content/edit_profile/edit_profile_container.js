import { connect } from "react-redux";
import EditProfile from "./edit_profile";
import { logout } from "../../../../actions/session_actions";

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
