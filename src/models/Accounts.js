
const mapStateToProps = ({accountInfo}) => ({accounts: accountInfo.accounts});

const mapDispatchToProps = (dispatch) => ({
  onClickAdd: () => dispatch({type: 'add'}),
  onClickDel: (idx) => dispatch({type: 'del', index: idx}),
  onClickEdit: (idx, nvg) => {
    dispatch({type: 'setIndex', index: idx});
    dispatch({type: 'edit', navigator: nvg})
  },
});

export { mapStateToProps, mapDispatchToProps };