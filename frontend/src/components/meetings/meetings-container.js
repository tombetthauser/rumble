import { connect } from "react-redux";
import { fetchUsers } from "../../actions/user_actions";
import Meeting from "./meeting";

const mapStateToProps = state => ({
    users: Object.values(state.users)

});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);