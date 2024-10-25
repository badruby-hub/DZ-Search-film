import { useContext, useState } from "react";
import { Calendar } from "./Calendar";
import { LocaleContext } from "./LocaleContext";
import classes from "./index.module.css";
import { PopupWindow } from "@/components/PopupWindow";
export function CalendarDemo() {
    const 
    [locale, setLocale] = useState('ru-RU');
    return<>
    <label>
    locale:
        <select value={locale} onChange={event=>setLocale(event.target.value)}>
            {['ru-RU','en-US','ar','zh','ko','ja'].map(l=><option key={l} value={l}>{l}</option>)}
        </select>
    </label>
    <LocaleContext.Provider value={locale}>
        <section className={classes.grid}>
    <Test1/>
    <TestPopUp/>
    <Test2/>
    <Test3/>
    <Test4/>
    </section>
    </LocaleContext.Provider>
    </>;
}   

function DateToYYYY_MM(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2,'0');
}
function YYYYMMToDate(str) {
    const 
    [year, month] = str.split('-')
    return new Date(year,month-1, 1)
}


function Test1() {
    const 
     [date, setDate] = useState(new Date);
    return<fieldset>
    <input type="month" value={DateToYYYY_MM(date)} onChange={event=>setDate(YYYYMMToDate(event.target.value))}/>
    <Calendar date={date}/>
    </fieldset>;
}


function Test2() {
    return <fieldset>
<LocaleContext.Provider value={"zh"}>
    <Calendar date={new Date}/>
</LocaleContext.Provider>
    </fieldset>
}

function TestPopUp() {
    const [visible, setVisible] = useState(false);
    return <fieldset>
        <button onClick={() => setVisible(visible === false ? true : false)}>{visible ? 'Закрыть' : 'Открыть'}</button>
        <input type="date"/>
        {visible && <PopupWindow><img className="atom" src="/istockphoto-1132090957-612x612.jpg" alt="" /></PopupWindow>}
    </fieldset> 
}

function Test3() {
  const locale = useContext(LocaleContext),
        [date, setDate] = useState(new Date),
        onClick = event=>{
            const day = +event.target.closest('td[data-day]')?.dataset?.day;
            if(day)
                setDate(prev=> new Date(prev.getFullYear(), prev.getMonth(), day))
        };
        return <fieldset onClick={onClick}>
            date: {date.toLocaleDateString(locale)}
            <Calendar date={date}/>
        </fieldset>
}

function Test4() {
    const 
    locale = useContext(LocaleContext),
    [open,setOpen] = useState(false),
    [date, setDate] = useState(new Date),
    onClick1 = () => setOpen(true),
    onClick2 = event=>{
        const day = +event.target.closest('td[data-day]')?.dataset?.day;
        if(day){
            setDate(prev=> new Date(prev.getFullYear(), prev.getMonth(), day))
        setOpen(false);
        }
    };
    return <fieldset>
        <div
         onClick={onClick1}
         className={classes.dateselector}>
            {date.toLocaleDateString(locale)}
        </div>
        <div onClick={onClick2}>
        {open && <PopupWindow>
            <Calendar date={date}/>
            </PopupWindow>}
            </div>
    </fieldset>
}