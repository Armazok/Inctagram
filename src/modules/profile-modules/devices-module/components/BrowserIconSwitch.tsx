import { FC } from 'react'

import { IconBaseProps } from 'react-icons'
import { FaChrome, FaEdge, FaFirefox, FaInternetExplorer, FaSafari } from 'react-icons/fa'
import { IBrowser } from 'ua-parser-js'

type Props = {
  browser: IBrowser
} & Pick<IconBaseProps, 'size' | 'color'>

export const BrowserIconSwitch: FC<Props> = ({ browser, ...rest }) => {
  switch (browser.name) {
    case 'Chrome':
      return <FaChrome {...rest} />

    case 'Firefox':
      return <FaFirefox {...rest} />

    case 'Edge':
      return <FaEdge {...rest} />

    case 'Safari':
      return <FaSafari {...rest} />

    default:
      return <FaInternetExplorer {...rest} />
  }
}
