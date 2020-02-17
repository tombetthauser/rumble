import { connect } from "react-redux";
import SidebarProfile from "./sidebar_profile";

const mapStateToProps = state => ({
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarProfile);