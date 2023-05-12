import { Text } from "react-native";
import React from "react";

const SubText = ({
  borderWidth,
  borderColor,
  text,
  size,
  color,
  family,
  letterSpacing,
  align = "center",
  leading,
}) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontFamily: family,
        letterSpacing: letterSpacing ? letterSpacing : -0.02,
        textAlign: align,
        lineHeight: leading,
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}
    >
      {text}
    </Text>
  );
};

export default SubText;
