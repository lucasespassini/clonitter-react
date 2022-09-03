import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  // config,
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#0A0C10', '#0A0C10')(props),
      }
    })
  },
})