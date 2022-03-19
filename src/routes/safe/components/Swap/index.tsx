import { makeStyles } from '@material-ui/core/styles'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReceiveModal from 'src/components/App/ReceiveModal'
import Tokens from './Tokens'
import { styles } from './style'

import cn from 'classnames'

import { SAFELIST_ADDRESS } from 'src/routes/routes'
import SendModal from 'src/routes/safe/components/Swap/SendModal'
import CurrencyDropdown from 'src/routes/safe/components/CurrencyDropdown'
import {
  safeFeaturesEnabledSelector,
  safeNameSelector,
  safeParamAddressFromStateSelector,
} from 'src/logic/safe/store/selectors'

import SwapCard  from './SwapCard'

import { useFetchTokens } from 'src/logic/safe/hooks/useFetchTokens'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { FEATURES } from 'src/config/networks/network.d'

const Collectibles = lazy(() => import('src/routes/safe/components/Swap/Collectibles'))
const Coins = lazy(() => import('src/routes/safe/components/Swap/Coins'))

export const MANAGE_TOKENS_BUTTON_TEST_ID = 'manage-tokens-btn'
export const BALANCE_ROW_TEST_ID = 'balance-row'

const INITIAL_STATE = {
  erc721Enabled: false,
  showToken: false,
  showManageCollectibleModal: false,
  sendFunds: {
    isOpen: false,
    selectedToken: '',
  },
  showReceive: false,
}

export const COINS_LOCATION_REGEX = /\/swap\/?$/
export const COLLECTIBLES_LOCATION_REGEX = /\/swap\/collectibles$/

const useStyles = makeStyles(styles)

const Swap = (): React.ReactElement => {
  const classes = useStyles()
  const [state, setState] = useState(INITIAL_STATE)

  const address = useSelector(safeParamAddressFromStateSelector)
  const featuresEnabled = useSelector(safeFeaturesEnabledSelector)
  const safeName = useSelector(safeNameSelector) ?? ''

  useFetchTokens(address as string)

  useEffect(() => {
    const erc721Enabled = Boolean(featuresEnabled?.includes(FEATURES.ERC721))

    setState((prevState) => ({
      ...prevState,
      erc721Enabled,
    }))
  }, [featuresEnabled])

  const onShow = (action) => {
    setState((prevState) => ({ ...prevState, [`show${action}`]: true }))
  }

  const onHide = (action) => {
    setState((prevState) => ({ ...prevState, [`show${action}`]: false }))
  }

  const showSendFunds = (tokenAddress: string): void => {
    setState((prevState) => ({
      ...prevState,
      sendFunds: {
        isOpen: true,
        selectedToken: tokenAddress,
      },
    }))
  }

  const hideSendFunds = () => {
    setState((prevState) => ({
      ...prevState,
      sendFunds: {
        isOpen: false,
        selectedToken: '',
      },
    }))
  }

  const {
    swapCard,
    assetDivider,
    assetTab,
    assetTabActive,
    assetTabs,
    controls,
    manageTokensButton,
    receiveModal,
    tokenControls,
  } = classes
  const { erc721Enabled, sendFunds, showManageCollectibleModal, showReceive, showToken } = state

  return (
    <Suspense fallback={null}>
      <SwapCard className={classes.swapCard}/>
    </Suspense>
  )
}

export default Swap
