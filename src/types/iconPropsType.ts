export type IconPropsType = {
  /** Set icon-components fill color from design system */
  color?: string
  /** Set width and height of icon-components in pixels */
  size?: number
  /** Whether to scale icon-components according to font-size. Sets width and height to 1em. */
  autoSize?: boolean
  /** Props to pass directly to svg element */
  svgProps?: React.SVGProps<SVGSVGElement>
} & Omit<React.HTMLProps<HTMLSpanElement>, 'color' | 'size'>
