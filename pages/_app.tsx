import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { Home2, Help } from "tabler-icons-react";
import { getCookie, setCookies } from 'cookies-next';
import Router from 'next/router';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NavBar
            data={[
              { icon: Home2, label: "Home", onClick: () => Router.push("/") },
              { icon: Help, label: "Help", onClick: () => Router.push("https://www.hasbro.com/common/instruct/Yahtzee.pdf") },
            ]}
        />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});