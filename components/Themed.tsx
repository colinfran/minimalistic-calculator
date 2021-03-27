import * as React from 'react'
import {
  Text as DefaultText,
  View as DefaultView,
  TouchableHighlight as DefaultTouchableHighlight,
} from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): any {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if (colorFromProps) {
    return colorFromProps
  }
  return Colors[theme][colorName]
}

type ThemeProps = {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type TouchableHighlightProps = ThemeProps &
  DefaultTouchableHighlight['props']

export function Text(props: TextProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps): JSX.Element {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function TouchableHighlight(
  props: TouchableHighlightProps,
): JSX.Element {
  const { style, lightColor, onPress, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  )

  return (
    <DefaultTouchableHighlight
      activeOpacity={0.9}
      underlayColor="grey"
      onPress={onPress}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  )
}
