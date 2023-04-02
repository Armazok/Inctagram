import style from './button.module.scss'
import Heading from "@/components/Heading";

const Button = ({text, tag}) => {
    return <button className={style.but}>
        <Heading style={style.title} tag={tag} text={text}/>
    </button>
}

export default Button;

