module.exports = {
  pathPrefix: `/dh`,
  siteMetadata: {
    title: `Disney Heroes: Badge List`,
    description: `Disney Heroes: Battle Mode; Badge Database`,
    author: `pinkswall`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tab`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `de`,
        path: `${__dirname}/src/data/de`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `es`,
        path: `${__dirname}/src/data/es`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fr`,
        path: `${__dirname}/src/data/fr`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `it`,
        path: `${__dirname}/src/data/it`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ja`,
        path: `${__dirname}/src/data/ja`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ko`,
        path: `${__dirname}/src/data/ko`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pt`,
        path: `${__dirname}/src/data/pt`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ru`,
        path: `${__dirname}/src/data/ru`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `zh-hans`,
        path: `${__dirname}/src/data/zh-hans`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `zh-hant`,
        path: `${__dirname}/src/data/zh-hant`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        extensions: [`tab`],
        delimiter: `\t`,
        noheader: false,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        path: `${__dirname}/locales`,
        languages: [
          `en`,
          `de`,
          `fr`,
          `es`,
          `it`,
          `pt`,
          `ru`,
          `ja`,
          `ko`,
          `zh-hans`,
          `zh-hant`,
        ],
        defaultLanguage: `en`,

        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
        pages: [
          {
            matchPath: "/:lang?/blog/:uid",
            getLanguageFromPath: true,
            excludeLanguages: ["es"],
          },
          {
            matchPath: "/preview",
            languages: ["en"],
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}