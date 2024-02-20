import * as React from "react"

import MemberList from "../../json/members.json"
import Adopters from "../../json/adopters.json"
import LogosGrid from "../LogosGrid"

import { shuffle } from "../../util/shuffle"

export enum LogoType {
  STRATEGIC = "strategic",
  ENTERPRISE = "enterprise",
  PARTICIPANT = "participant",
  ADOPTERS = "adopters",
}

interface LogosGridProps {
  members: LogoType
  title: string
  description: string
}

export interface MembersProps {
  name: string
  logo: string
  url: string
  tier: string
}

const Logos = ({ members, title, description }: LogosGridProps) => {
  // filter MemberList to show only type of members
  let filteredMembers: MembersProps[] = []

  if (members === LogoType.ADOPTERS) {
    filteredMembers.push(...Adopters)
  } else {
    MemberList.forEach(member => {
      if (member.tier === members) {
        filteredMembers.push(member)
      }
    })
  }

  // Randomly mix up logos
  filteredMembers = shuffle(filteredMembers)

  return (
    <section className="max-w-[1264px] md:px-0 px-6 w-full mx-auto flex flex-col items-center justify-center py-10">
      <div className="max-w-[700px] mx-auto">
        <h3 className="text-[36px] sm:text-[42px] leading-[56px] text-center">
          {title}
        </h3>
        <p className="text-[16px] leading-[24px] text-grey text-center mt-3">
          {description}
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-3">
        <LogosGrid logos={filteredMembers} type={members} />
      </div>
    </section>
  )
}

export default Logos
