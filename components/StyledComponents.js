import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Content,
  Button,
  Body,
  Text,
  List,
  ListItem
} from "native-base";
import {LinearGradient} from 'expo';

const styles = StyleSheet.create({
  content: {
    padding: 8,
    flex: 1
  },
  listItem: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#7ABED2',
    marginBottom: 12

  },
  listItemOrange: {
    borderColor: '#d9ad66'
  },
  listPadding: {
    padding: 6
  },
  listItemBase: {
    borderBottomWidth: 0,
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom:0
  },
  text: {
    color: '#fff',
    fontFamily: 'Supercell-magic',
    fontSize: 12
  },
  button: {
    borderRadius: 6,
    borderWidth: 0,
    height: 40,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.3
  }
});

const StyledContent = ({children, ...etc}) => (
  <LinearGradient style={styles.content} colors={['#024065', '#045081']}>
    <Content {...etc}>{children}</Content>
  </LinearGradient>
)
const StyledListItem = ({children, orange, onPress, padding, ...etc}) => (
  <LinearGradient {...etc} style={[styles.listItem, orange && styles.listItemOrange, padding && styles.listPadding]} colors={orange ? ['#FAD062', '#f6b851'] :['#51B9D2', '#3179A1']}>
    <ListItem onPress={onPress} style={styles.listItemBase}>{children}</ListItem>
  </LinearGradient>
)
const TextStyled = ({children, ...etc}) => (
  <Text style={styles.text} {...etc}>{children}</Text>
)
const GreenButton = ({children, disabled, ...etc}) => (
  <LinearGradient style={[styles.button, disabled && styles.disabled]} colors={['#def686','#64ae34']}>
    <Button disabled={disabled} {...etc} style={styles.button}>{children}</Button>
  </LinearGradient>
)
const RedButton = ({children, disabled, ...etc}) => (
  <LinearGradient style={[styles.button, disabled && styles.disabled]} colors={['#F97E81','#DD2026']}>
    <Button disabled={disabled} {...etc} style={styles.button}>{children}</Button>
  </LinearGradient>
)

export default  {
  StyledContent,
  StyledListItem,
  TextStyled,
  GreenButton,
  RedButton,
}
