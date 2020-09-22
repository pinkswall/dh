import React from "react"
import { PageProps, graphql } from "gatsby"

type ItemProps = {
  allNormalCampaignTab: {
    field1: string,
    IS_MAJOR: string,
    PRIMARY_LOOT: string,
    SECONDARY_LOOT: string,
  },
}

const Item: React.FC<PageProps<ItemProps>> = ({ data }) => (
  <pre>{JSON.stringify(data, null, 4)}</pre>
)

export const query = graphql`
  {
    allNormalCampaignTab {
      edges {
        node {
          field1
          IS_MAJOR
          PRIMARY_LOOT
          SECONDARY_LOOT
        }
      }
    }
  }
`

export default Item
