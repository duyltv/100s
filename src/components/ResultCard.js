import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Card, CardItem, Body, Thumbnail, Left } from 'native-base'
import I18n from '../i18n'
import { View, ResultAnswerButton } from './index'
import Anchor from './Anchor'

export default class ResultCard extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answered: PropTypes.number.isRequired,
    A: PropTypes.string.isRequired,
    B: PropTypes.string.isRequired,
    C: PropTypes.string.isRequired,
    D: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    result: PropTypes.string.isRequired,
  };

  static defaultProps = {
    thumbnail: '',
    moreUrl: '',
  };

  getAdditionalButtonProps = (buttonIndex) => {
    const { answered, result } = this.props
    const defaultButtonProps = {
      small: true,
    }

    var __v = result.charCodeAt(0) - 'A'.charCodeAt(0);

    // 1. Correct button
    if (__v === buttonIndex) {
      // correctly answered => green bg
      if (answered === __v) {
        return {
          ...defaultButtonProps,
        }
      }
      // otherwise show correct artist with green border
      return {
        ...defaultButtonProps,
        bordered: true,
      }
    }
    // 2. Answered non-correct button => display red border
    if (answered === buttonIndex) {
      return {
        ...defaultButtonProps,
        danger: answered !== __v,
      }
    }
    // 3. Non-correct, non-answered button => white border
    return { ...defaultButtonProps, bordered: true, light: true }
  };

  renderAnswerButtons() {
    const { A, B, C, D } = this.props
    return ([
      <ResultAnswerButton
        key={A}
        title={A}
        {...this.getAdditionalButtonProps(0)}
      />,
      <ResultAnswerButton
        key={B}
        title={B}
        {...this.getAdditionalButtonProps(1)}
      />,
      <ResultAnswerButton
        key={C}
        title={C}
        {...this.getAdditionalButtonProps(2)}
      />,
      <ResultAnswerButton
        key={D}
        title={D}
        {...this.getAdditionalButtonProps(3)}
      />])
  }

  render() {
    const { question, result } = this.props
    return (
      <Card style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
        <CardItem>
          <Left>
            <Body>
              <Text>
                {result}
              </Text>
              <Anchor text={I18n.t('btn.lyrics')} />
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{ padding: 10 }} cardBody>
          <Text>
            {question}
          </Text>
        </CardItem>
        <CardItem>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {this.renderAnswerButtons()}
          </View>
        </CardItem>
      </Card>
    )
  }
}
