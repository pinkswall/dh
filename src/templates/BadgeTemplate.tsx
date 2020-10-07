import React from "react"
import { PageProps } from "gatsby"
import { Link, useTranslation, Trans } from "gatsby-plugin-react-i18next"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SelectLang from "../components/selectLang"

const BadgeTemplate: React.FC<PageProps> = props => {
  const { t } = useTranslation()
  return (
    <Layout>
      <SelectLang />
      <SEO title={t("YAS")} />
      <code>
        <pre>{JSON.stringify(props.pageContext, null, 2)}</pre>
        <pre>'YAS'</pre>
        <pre>{JSON.stringify(props.pageContext.language, null, 2)}</pre>
      </code>
      <Link to="/">Go back to main</Link>
    </Layout>
  )
}

export default BadgeTemplate
