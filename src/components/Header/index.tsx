// #test

import css from './index.module.css'

import { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/app/store'
import { setClaim } from '@/features/game/gameSlice'
import Badge from '@components/Badge'
import Button from '@components/Button'
import Dropdown from '@/components/Header/Dropdown'
import {Loader} from './Dropdown'
import HeaderBase, { HeaderSection } from '@/components/HeaderBase'
import { MainframeContext } from '@components/Mainframe'




interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>
{
}


const Header = (props: HeaderProps) => {
    const [activeDropdown, setActiveDropdown] = useState(0)
    const [gameOverShow, setGameOverShow] = useState(true)
    const dispatch = useDispatch()
    const context = useContext(MainframeContext)

    const game = useSelector((state: RootState) => state.game)

    return <HeaderBase
    >
        { game.walletConnected ? (
            <>
                <HeaderSection>
                    <div onClick={ () => context.setDisableWalletModal(true) } className={ [css.walletHash].join(' ') }>
                        DFYrNUgxguiGKmZKdbGga...
                    </div>
                    <Button onClick={ () => context.setConnectWalletModal(true) } className={ [css.walletButton, 'd-mobile'].join(' ') }>
                        <img src="/assets/images/icons/wallet.svg" alt="wallet" />
                    </Button>
                    { !context.gameOver ? (
                        <>
                            <Dropdown
                                loading={ game.loadingRooms }
                                values={
                                    [...Array(5)].map(item=>[1])
                                }
                                rooms={true}
                                controller={{
                                    id: 1,
                                    currentId: activeDropdown,
                                    setId: setActiveDropdown
                                }}
                                callback={ context.setContentBlured }
                                text={ 
                                    <>
                                        <span className={ 'd-desktop' }>Rooms</span>
                                        <img className={ 'd-mobile' } src="/assets/images/icons/home.svg" alt="" />
                                    </>
                                }
                                badgeValue={ 16 }
                            />
                            <Dropdown
                                loading={ game.loadingRooms }
                                values={
                                    [...Array(10)].map(item=>[12, 10])
                                }
                                tables={true}
                                controller={{
                                    id: 2,
                                    currentId: activeDropdown,
                                    setId: setActiveDropdown
                                }}
                                callback={ context.setContentBlured }
                                text={
                                    <>
                                        <span className={ 'd-desktop' }>Tables</span>
                                        <img className={ 'd-mobile' } src="/assets/images/icons/table.svg" alt="" />
                                    </>
                                }
                                badgeValue={ 8 }
                            />
                        </>
                    ) : '' }
                </HeaderSection>
                <HeaderSection>
                    <img className={ 'd-mobile' } src="/assets/images/icons/chair.svg" alt="chair" />
                        <div className={ css.places }>
                            <span className={ ['d-desktop', 'textMuted'].join(' ') }>Places&nbsp;</span>
                            <Badge transparentMobile={ true }>
                                { game.loadingRooms ? (
                                    <Loader/>
                                ) : (
                                    <>&nbsp;5/5&nbsp;</>
                                ) }
                            </Badge>
                        </div>
                        { game.claim ? (
                            <Button onClick={ () => dispatch(setClaim(false)) }>CLAIm</Button>
                        ) : ''}
                        { context.gameOver ? (
                            <>
                                <div className={ 'd-mobile' }>
                                    <div onClick={ ()=>setGameOverShow(!gameOverShow) } className={ [css.gameOverSectionButton, gameOverShow ? css.gameOverSectionButtonActive : ''].join(' ') }>
                                        <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.499999 7.86602C-0.166668 7.48112 -0.166667 6.51888 0.5 6.13397L9.5 0.937821C10.1667 0.552921 11 1.03405 11 1.80385L11 12.1962C11 12.966 10.1667 13.4471 9.5 13.0622L0.499999 7.86602Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className={ [css.gameOverSection, gameOverShow ? css.gameOverSectionShow : ''].join(' ') }>
                                    <div className={ 'd-mobile' }>
                                        <div>
                                            <div className={ 'textMuted' }>
                                                announcement of results
                                            </div>
                                            04:51
                                        </div>
                                    </div>
                                    <div className={ css.gameOverButtons }>
                                        <Button primary={true}>REFOUND</Button>
                                        <Button primary={true}>BURN</Button>
                                    </div>
                                </div>
                            </>
                        ) : '' }
                </HeaderSection>
            </>
        ) : (
            <>
                <HeaderSection>
                    <Button onClick={ () => context.setConnectWalletModal(true) }>CONNECT WALLET</Button>
                </HeaderSection>
            </>
        ) }
    </HeaderBase>
}


export default Header