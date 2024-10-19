import Link from 'next/link';
import classes from './Header.module.css';
const 
    pages = [
    {href:'/', name:'home'},
    {href:'/search', name:'Search movie'},
]
export function Header (){
    return <header>
        <nav className={classes.navigation}>
            <ul>
                {pages.map(({href,name})=><li key={href}>
                    <Link href={href}>{name}</Link>
                </li>)}
            </ul>
            </nav>
    </header>
}