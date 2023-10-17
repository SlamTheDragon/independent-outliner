import { ReactComponent as Discord } from '../../../assets/svg/discordIcon.svg'
import style from './footer.module.scss'


export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.footerHeader}>

                {/* <Logo /> */}

                <div className={style.footerText}>
                    <span style={{display:'flex', alignItems:'center'}}>
                        <a href="" target="_blank" rel="noreferrer">Coded With Love <span style={{ fontSize: '7pt' }}>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span> Powered By Github Pages</a>
                    </span>
                    <span>
                        <a href="">Terms of Service & Privacy</a>
                    </span>
                    <span>
                        <a href="">Open Source Licenses</a>
                    </span>
                    <span>
                        © 2023 Written By SlamTheDragon
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
