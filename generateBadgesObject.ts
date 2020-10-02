function generateBadgesObject(locales: Locales, tabs: Tabs): Badges {
  const badges: any = {}

  // badge 이름, 카테고리, 등급
  for (let ITEM in tabs["items"]) {
    const CATEGORY = tabs["items"][ITEM]["CATEGORY"]
    if (CATEGORY == "GEAR" || CATEGORY == "REEL" || CATEGORY == "SHARD") {
      badges[ITEM] = {
        CATEGORY: CATEGORY,
        RARITY: tabs["items"][ITEM]["RARITY"],
      }
    }
  }

  // badge 드랍 정보
  for (let ITEM in badges) {
    for (let STAGE in tabs["normal_campaign"]) {
      const PRIMARY_LOOT = tabs["normal_campaign"][STAGE]["PRIMARY_LOOT"].split(
        ","
      )
      const SECOND_LOOT = tabs["normal_campaign"][STAGE][
        "SECONDARY_LOOT"
      ].split(",")

      for (let looting of PRIMARY_LOOT) {
        if (
          ITEM == looting &&
          tabs["normal_campaign"][STAGE]["IS_MAJOR"] == "1"
        ) {
          if (badges[ITEM]["PRIMARY_LOOT"] == undefined) {
            badges[ITEM]["PRIMARY_LOOT"] = [STAGE]
            continue
          }
          badges[ITEM]["PRIMARY_LOOT"].push(STAGE)
        }
      }

      for (let looting of SECOND_LOOT) {
        if (
          ITEM == looting &&
          tabs["normal_campaign"][STAGE]["IS_MAJOR"] == "1"
        ) {
          if (badges[ITEM]["SECONDARY_LOOT"] == undefined) {
            badges[ITEM]["SECONDARY_LOOT"] = [STAGE]
            continue
          }
          badges[ITEM]["SECONDARY_LOOT"].push(STAGE)
        }
      }
    }

    // badge 영웅 정보
    for (let HERO_NAME in tabs["normal_gear"]) {
      for (let COLOR in tabs["normal_gear"][HERO_NAME]) {
        const neededBadges = tabs["normal_gear"][HERO_NAME][COLOR].split(",")
        for (let badge of neededBadges) {
          if (ITEM == badge) {
            // 맨 처음
            if (badges[ITEM]["HERO"] == undefined) {
              badges[ITEM]["HERO"] = { [HERO_NAME]: [COLOR] }
              continue
            }
            // 현재 영웅의 첫 뱃지가 아님 (이미 현재 영웅의 리스트가 있음)
            if (badges[ITEM]["HERO"][HERO_NAME]) {
              badges[ITEM]["HERO"][HERO_NAME].push(COLOR)
              continue
            }
            // 현재 영웅의 첫 뱃지 (현재 영웅의 리스트가 없음)
            badges[ITEM]["HERO"][HERO_NAME] = [COLOR]
          }
        }
      }
    }
  }

  return badges
}

interface Locale {
  [key: string]: string
}

interface Locales {
  [locale: string]: Locale
}

interface Tab {
  [name: string]: {
    [key: string]: string
  }
}

interface Tabs {
  [tabFileName: string]: Tab
}

interface Badge {
  CATEGORY: string
  RARITY: string
  PRIMARY_LOOT: string[]
  SECONDARY_LOOT: string[]
  HERO: {
    [HERO_NAME: string]: string[]
  }
}

interface Badges {
  [ITEM: string]: Badge
}

export default generateBadgesObject
