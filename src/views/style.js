import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	mainContent: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: '#dddddd',
  },

  text: {
		flex: 1,
		fontSize: 25,
		marginTop: 2,
		marginBottom: 2,
		marginLeft: 10,
		marginRight: 10,
	},

	accountItem: {
		flex: 1,
		flexDirection: 'column',
		marginTop: 3,
		marginBottom: 3,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		borderWidth: 2,
		borderColor: '#aaaaaa',
	},

	accountItemContent: {
		flex: 2,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
	},

	accountItemBlock: {
		flex: 1,
		flexDirection: 'row',
	},

	accountItemKey: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 20,
	},

	accountItemValue: {
		flex: 2,
		fontSize: 20,
	},
	
	accountDataItem: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 10,
		marginRight: 10,
		fontSize: 25,
	},

	accountDataKey: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 10,
		marginRight: 10,
	},

	accountDataValue: {
		flex: 2,
		marginLeft: 10,
		marginRight: 10,
	},

	imagesView: {
		flex: 1,
		flexDirection: 'row',
		width: 100,
		height: 100,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
	},
});

export default styles;