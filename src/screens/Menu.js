import React, { Component } from 'react'
import { ToastAndroid, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import I18n from '../i18n'
import {
  selectIsGameLoading,
  selectIsUpdating,
  selectUpdateProgress,
} from '../store/selectors'
import { Button } from '../components'
import BackgroundView from '../components/BackgroundView'
import ProgressBar from '../components/ProgressBar'
import {
  playGamePressed,
  settingsPressed,
  checkUpdatesPressed,
} from '../store/navigation/actions'

const screenStyles = {
  padding: 30,
}

const buttonStyles = {
  margin: 10,
}

const spaceStyles = {
  marginTop: 5,
  marginBottom: 10,
  paddingLeft: 10,
}

const fixedBottomStyles = {
  marginTop:10,
  textAlign: 'center'
}

@connect(
  state => ({
    isLoading: selectIsGameLoading(state),
    isUpdating: selectIsUpdating(state),
    updateProgress: selectUpdateProgress(state),
  }),
  {
    playGamePressed,
    checkUpdatesPressed,
    settingsPressed,
  },
)
export default class Menu extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: I18n.t('menu.header', screenProps.language),
  });

  static propTypes = {
    playGamePressed: PropTypes.func.isRequired,
    checkUpdatesPressed: PropTypes.func.isRequired,
    settingsPressed: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    updateProgress: PropTypes.number.isRequired,
  };

  onGamePlayPressed = () => {
    this.props.playGamePressed()
  };

  onSettingsPressed = () => {
    this.props.settingsPressed()
  };

  onUpdatePressed = () => {
    this.props.checkUpdatesPressed()
    .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG))
  };

  render() {
    const { isLoading, isUpdating, updateProgress } = this.props
    const disableButtons = isLoading || isUpdating
    return (
      <BackgroundView style={screenStyles}>
        <Text style={spaceStyles}>
            This is Quiz Appplications which was built by five dogs team. With varied of questions about life subject, fun subject...
        </Text>

        <Text style={spaceStyles}>
          Now, you can start game to explore and feeling by way click on Play Game button below.
        </Text>

        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.playGame')}
          onPress={this.onGamePlayPressed}
        />
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.checkUpdates')}
          onPress={this.onUpdatePressed}
        />
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.settings')}
          onPress={this.onSettingsPressed}
        />

        <Text style={fixedBottomStyles}>
          Five Dogs Team.
        </Text>

        {disableButtons && <Spinner />}
        {isUpdating && <ProgressBar progress={updateProgress} />}
      </BackgroundView>
    )
  }
}
