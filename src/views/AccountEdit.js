import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';
import { HeaderBackButton } from 'react-navigation';

class AccountEdit extends React.Component {
  static navigationOptions({navigation}) {
    return {
      title: 'Edit Account',
      headerLeft: (
        <HeaderBackButton onPress={navigation.getParam('onClickBack')} />
      ),
    };
  }

  componentDidMount() {
    const { navigation, onClickBack } = this.props;
    navigation.setParams({
      onClickBack: () => onClickBack(navigation.goBack)
    });
  }

  render() {
    const {
      accountData, index, navigation,
      onClickBack, onChangeDate, onChangeTime
    } = this.props;

    // let position;
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log(position);
    //   },
    //   (error) => {
    //     // See error code charts below.
    //     console.log(error.code, error.message);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );

    return (
      <View>
        <Text>
          Account Edit
        </Text>

        <DatePicker
          mode="date"
          placehold="select date"
          format="YYYY-MM-DD"
          date={accountData.date ? accountData.date : new Date()}
          minDate="1900-01-01"
          maxDate="2099-12-31"
          confirmBtnText="Confirm"
          cancelBtnTest="Cancel"
          onDateChange={(date) => onChangeDate(date)}
        />
        <DatePicker
          mode="time"
          placehold="select time"
          format="LT"
          is24Hour={true}
          date={accountData.time ? accountData.time : new Date()}
          confirmBtnText="Confirm"
          cancelBtnTest="Cancel"
          onDateChange={(time) => onChangeTime(time)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ accountInfo }) => ({
  index: accountInfo.index,
  accountData: accountInfo.accountData,
});

const mapDispatchToProps = (dispatch) => ({
  onClickBack: (callBack) => {
    dispatch({type: 'account_save'});
    dispatch({type: 'account_back', callBack});
    console.log('BACK');
  },
  onChangeDate: (date) => dispatch({type: 'account_edit_date', date}),
  onChangeTime: (time) => dispatch({type: 'account_edit_time', time}),
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;