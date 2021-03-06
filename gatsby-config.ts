module.exports = {
  pathPrefix: `/dh`,
  siteMetadata: {
    title: `Disney Heroes: Badge Database`,
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
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        path: `${__dirname}/src/data/locales`,
        languages: [
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
        defaultLanguage: `es`,

        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
        // pages: [
        //   {
        //     matchPath: "/:lang?/:uid",
        //     getLanguageFromPath: true,
        //     excludeLanguages: ["es"],
        //   },
        //   {
        //     matchPath: "/preview",
        //     languages: ["es"],
        //   },
        // ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `DH: Badge Database`,
        short_name: `DH: Badges`,
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
