export type WindowId = 'main' | 'about' | 'terminal'

export type MainViewId = 'overview' | 'works' | 'enterprise' | 'stack' | 'principles'

export interface DesktopWindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
  minWidth: number
  minHeight: number
}

export interface DockAppItem {
  id: string
  label: string
  kind: 'window' | 'view' | 'spotlight' | 'external' | 'copy-email'
  windowId?: WindowId
  viewId?: MainViewId
  url?: string
  gradient: string
  iconName:
    | 'finder'
    | 'about'
    | 'works'
    | 'enterprise'
    | 'terminal'
    | 'spotlight'
    | 'safari'
    | 'github'
    | 'mail'
}

export interface SpotlightEntry {
  id: string
  group: string
  title: string
  subtitle: string
  keywords: string
  actionType: 'view' | 'enterprise' | 'window' | 'external' | 'copy-email'
  viewId?: MainViewId
  enterpriseId?: string
  windowId?: WindowId
  url?: string
}

export interface TerminalHistoryLine {
  id: number
  type: 'command' | 'output' | 'accent' | 'muted' | 'success'
  text: string
}
