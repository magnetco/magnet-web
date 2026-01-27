import {
  Sparkles,
  Folder,
  Target,
  Newspaper,
  Mail,
  MessageCircle,
  Layout,
  BarChart3,
  Binoculars,
  Palette,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  description: string
  isNew?: boolean
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: 'Content & Messaging',
    items: [
      {
        label: 'Ad Copy Editor',
        href: '/editor',
        icon: Sparkles,
        description: 'Create and edit ad copy mockups with AI assistance',
      },
      {
        label: 'Campaigns',
        href: '/campaigns',
        icon: Folder,
        description: 'Manage your marketing campaigns and mockups',
      },
      {
        label: 'Messaging Hub',
        href: '/messaging',
        icon: Target,
        description: 'ICP definitions, value props, positioning statements',
        isNew: true,
      },
      {
        label: 'Content Strategy',
        href: '/content',
        icon: Newspaper,
        description: 'Blog planning, content calendar, topic clusters',
        isNew: true,
      },
    ],
  },
  {
    title: 'Channels',
    items: [
      {
        label: 'Email Marketing',
        href: '/email',
        icon: Mail,
        description: 'Campaign builder, templates, automation sequences',
        isNew: true,
      },
      {
        label: 'Social Media',
        href: '/social',
        icon: MessageCircle,
        description: 'Post scheduling, content library, platform management',
        isNew: true,
      },
      {
        label: 'Landing Pages',
        href: '/pages',
        icon: Layout,
        description: 'Page builder, A/B testing, conversion optimization',
        isNew: true,
      },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      {
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Performance dashboards, attribution, ROI tracking',
        isNew: true,
      },
      {
        label: 'Competitive Intel',
        href: '/competitive',
        icon: Binoculars,
        description: 'Competitor tracking, market analysis, SWOT',
        isNew: true,
      },
    ],
  },
  {
    title: 'Assets & Systems',
    items: [
      {
        label: 'Brand Assets',
        href: '/brand',
        icon: Palette,
        description: 'Logo library, style guide, design system',
        isNew: true,
      },
      {
        label: 'CRM & Automation',
        href: '/crm',
        icon: Users,
        description: 'Lead management, workflows, pipeline tracking',
        isNew: true,
      },
    ],
  },
]
