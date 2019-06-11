import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackButton } from 'react-navigation';
import { TextInput, Button } from 'react-native-paper';
import styles from './style';

const MyDatePicker = ({date, onChangeDate}) => (
  <DatePicker
    mode="date"
    placehold="select date"
    format="YYYY-MM-DD"
    date={date ? date : new Date()}
    minDate="1900-01-01"
    maxDate="2099-12-31"
    confirmBtnText="Confirm"
    cancelBtnTest="Cancel"
    onDateChange={(date) => onChangeDate(date)}
  />
);

const MyTimePicker = ({time, onChangeTime}) => (
  <DatePicker
    mode="time"
    placehold="select time"
    format="LT"
    is24Hour={true}
    date={time ? time : new Date()}
    confirmBtnText="Confirm"
    cancelBtnTest="Cancel"
    onDateChange={(time) => onChangeTime(time)}
  />
);

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

  onAddImage() {
    const options = {
      title: 'Select Image',
      customButtons: [{ name: 'photo', title: 'Choose Image' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };

    const { onAddImage } = this.props;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        onAddImage(source.uri);
      }
    });
  }

  render() {
    const { accountData, onChangeDate, onChangeTime, onChangeAmount,
       onChangeItem, onChangeDesc } = this.props;

    return (
      <View>
        <Text style={styles.text}>
          Account Edit
        </Text>

        <View>
          <Text>Date</Text>
          <MyDatePicker date={accountData.date} onChangeDate={onChangeDate} />
        </View>

        <View>
          <Text>Time</Text>
          <MyTimePicker time={accountData.time} onChangeTime={onChangeTime} />
        </View>

        <View>
          <Text>Amount</Text>
          <TextInput keyboardType="number-pad"
            title="amount" defaultValue={accountData.amount} onChangeText={onChangeAmount} />
        </View>

        <View>
          <Text>Item</Text>
          <TextInput title="item" defaultValue={accountData.item} onChangeText={onChangeItem} />
        </View>

        <View>
          <Text>Desc</Text>
          <TextInput title="desc" defaultValue={accountData.desc} onChangeText={onChangeDesc} />
        </View>

        <View>
          <Text>Images</Text>
          <Button onPress={() => this.onAddImage()}>
            Add Image
          </Button>
        </View>

        <View>
          <Text>Location</Text>
        </View>
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
  onChangeAmount: (amount) => dispatch({type: 'account_edit_amount', amount}),
  onChangeItem: (item) => dispatch({type: 'account_edit_item', item}),
  onChangeDesc: (desc) => dispatch({type: 'account_edit_desc', desc}),
  onAddImage: (imgPath) => dispatch({type: 'account_add_img', imgPath}),
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;