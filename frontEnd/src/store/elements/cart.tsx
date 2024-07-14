import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleLeft, faCircleRight, faMoon, faShoppingCart, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isSideBarOpen, theme } from '../atoms/sideBar';

const Cart = ()=>{
    return(
    <>
    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
    </>
)}

const Bars = ()=>{
    const [x, setX] = useState(false);
    const [y, setY] = useState(false);
    const setIsOpen = useSetRecoilState(isSideBarOpen);
    const isOpen = useRecoilValue(isSideBarOpen);

    return(<>
        {!isOpen && !x && <div onClick={()=>{setX(true); setTimeout(() => { setX(false); }, 400); setTimeout(() => { setIsOpen(true); }, 400);}}><FontAwesomeIcon  icon={faBars} size='xl'/></div>}
        {!isOpen && x && <div><FontAwesomeIcon  icon={faBars} fade size='xl'/></div>}
        {isOpen && !y && <div onClick={()=>{setY(true); setTimeout(() => { setY(false); }, 400); setTimeout(() => { setIsOpen(false); }, 400);}}><FontAwesomeIcon icon={faXmark} size='xl'/></div>}
        {isOpen && y && <div><FontAwesomeIcon icon={faXmark} fade size='xl'/></div>}
    </>);
}

const ThemeIcon = ()=>{
    const [x, setX] = useState(false);
    const [y, setY] = useState(false);
    const setTheme = useSetRecoilState(theme);
    const isDark = useRecoilValue(theme);

    return(<>
        {!isDark && !x && <div onClick={()=>{setX(true); setTimeout(() => { setX(false); }, 400); setTimeout(() => { setTheme(true); }, 400);}}><FontAwesomeIcon  icon={faSun} size='xl'/></div>}
        {!isDark && x && <div><FontAwesomeIcon  icon={faSun} fade size='xl'/></div>}
        {isDark && !y && <div onClick={()=>{setY(true); setTimeout(() => { setY(false); }, 400); setTimeout(() => { setTheme(false); }, 400);}}><FontAwesomeIcon icon={faMoon} size='xl'/></div>}
        {isDark && y && <div><FontAwesomeIcon icon={faMoon} fade size='xl'/></div>}
    </>);
}

const Rarrow = ()=>{
    const [x, setX] = useState(false);

    return(<>
        {!x && <div onClick={()=>{setX(true); setTimeout(() => { setX(false); }, 100);}}><FontAwesomeIcon  icon={faCircleRight} size='2xl'/></div>}
        {x && <div><FontAwesomeIcon  icon={faCircleRight} fade size='2xl'/></div>}
    </>);
}

const Larrow = ()=>{
    return(<FontAwesomeIcon  icon={faCircleLeft} size='2xl'/>);
}

export { Cart, Bars, ThemeIcon, Rarrow, Larrow };

// onMouseEnter={()=>{setX(true); setTimeout(() => { setX(false); }, 700);}} 