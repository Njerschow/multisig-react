import { SyntheticEvent } from 'react'

import NFTIcon from 'src/routes/safe/components/Swap/assets/nft_icon.png'

export const setCollectibleImageToPlaceholder = (error: SyntheticEvent<HTMLImageElement, Event>): void => {
  error.currentTarget.onerror = null
  error.currentTarget.src = NFTIcon
}
