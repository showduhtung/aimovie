import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, AppShell } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { NavigationSidebar } from 'components';
import { QueryClient, QueryClientProvider } from 'react-query';

const DARK = 'dark';
const LIGHT = 'light';

const queryClient = new QueryClient();

type AppPropsInterface = AppProps & { colorScheme: ColorScheme };
export default function App({ Component, pageProps, colorScheme: colorTheme }: AppPropsInterface) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorTheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === DARK ? LIGHT : DARK);
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Aicadium Movie App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
              <AppShell
                padding="md"
                navbar={<NavigationSidebar />}
                styles={({ colorScheme, colors }) => ({
                  main: {
                    backgroundColor: colorScheme === 'dark' ? colors.dark[8] : colors.gray[0],
                  },
                })}
              >
                <Component {...pageProps} />
              </AppShell>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return { ...appProps, colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || DARK };
};
