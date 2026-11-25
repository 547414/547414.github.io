export type ProjectCategoryKey = 'all' | 'ai-tools' | 'indie-product' | 'production' | 'open-source'

export interface NavItem {
  label: string
  href: string
}

export interface StatMetric {
  value: string
  label: string
  hint: string
}

export interface TerminalTabItem {
  id: string
  filename: string
  command: string
  lineList: TerminalCodeLine[]
}

export interface TerminalCodeLine {
  prefix?: string
  key?: string
  value: string
  tone?: 'default' | 'accent' | 'amber' | 'muted' | 'success'
}

export interface PortraitCardItem {
  id: string
  eyebrow: string
  title: string
  summary: string
  highlightList: string[]
  accent: 'cyan' | 'amber' | 'emerald'
}

export interface TechGroupItem {
  id: string
  badge: string
  title: string
  subtitle: string
  skillList: TechSkillItem[]
}

export interface TechSkillItem {
  name: string
  core?: boolean
}

export interface ProjectLinkItem {
  label: string
  url: string
  primary?: boolean
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: Exclude<ProjectCategoryKey, 'all'>
  categoryLabel: string
  featured?: boolean
  statusBadge?: string
  summary: string
  highlightList: string[]
  tagList: string[]
  linkList: ProjectLinkItem[]
}

export interface EnterpriseTrackItem {
  title: string
  detail: string
  tagList: string[]
}

export interface PrincipleItem {
  index: string
  title: string
  enTitle: string
  description: string
}

export interface ProfileData {
  name: string
  handle: string
  email: string
  githubUrl: string
  websiteUrl: string
  websiteDisplay: string
  miniGameUrl: string
  statusText: string
  roleTitle: string
  heroLead: string
  heroSubLead: string
  motto: string
  navItemList: NavItem[]
  statMetricList: StatMetric[]
  terminalTabList: TerminalTabItem[]
  portraitCardList: PortraitCardItem[]
  techGroupList: TechGroupItem[]
  projectList: ProjectItem[]
  enterpriseTrackList: EnterpriseTrackItem[]
  principleList: PrincipleItem[]
}
