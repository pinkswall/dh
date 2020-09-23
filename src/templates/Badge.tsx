import React from "react"
import { useTranslation, Trans } from "react-i18next"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Badge = (NAME: string, DESC: string) => {
  const { t } = useTranslation()
  return (
    <Layout>
      <SEO title={t(NAME)} />
      <h1>
        <Trans>{NAME}</Trans>
      </h1>
      <blockquote>
        <Trans>{DESC}</Trans>
      </blockquote>
    </Layout>
  )
}

export default Badge
