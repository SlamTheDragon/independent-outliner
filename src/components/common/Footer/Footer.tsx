import Discord from '../../../assets/svg/discordIcon.svg'
import style from './footer.module.scss'


export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.footerHeader}>

                <div className={style.footerText}>
                    <span style={{display:'flex', alignItems:'center'}}>
                        <a href="" target="_blank" rel="noreferrer">This Application is not Affiliated with E621 <span style={{ fontSize: '7pt' }}>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span> We are Open Source</a>
                    </span>
                    <span>
                        <a href="">Terms of Service & Privacy</a>
                    </span>
                    <span>
                        {/* FIXME: */}
                        System Information
                    </span>
                </div>

            </div>

            <div className={style.footerHeaderLinks + ' snap'}>
                <div>
                    <a className={style.discord} href="" target="_blank" rel="noreferrer"><Discord /></a>
                </div>
            </div>
        </footer>
    )
}
