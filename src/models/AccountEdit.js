const INITIAL_STATE = {};

const mapStateToProps = ({ accountInfo }) => ({
  account: accountInfo.accounts[accountInfo.index],
});

const mapDispatchToProps = (dispatch) => ({

});

export { mapStateToProps, mapDispatchToProps };