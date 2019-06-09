import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { mapStateToProps, mapDispatchToProps } from '../models/AccountEdit';

const AccountEdit = ({ account, }) => {
  return (
    <View>
      <Text>
        Account Edit
      </Text>
    </View>
  );
}

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;