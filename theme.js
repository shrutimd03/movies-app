import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}

const styles = {
  global: (props) => ({
    body: {
      bg: mode(
        props.theme.semanticTokens.colors["chakra-body-bg"]._light,
        "black"
      )(props),
    },
  }),
};

const theme = extendTheme({
  config, 
  styles,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;